package cl.duoc.huertohogarbackend.controller;

import cl.duoc.huertohogarbackend.dto.CreateOrderRequest;
import cl.duoc.huertohogarbackend.dto.OrderItemRequest;
import cl.duoc.huertohogarbackend.model.*;
import cl.duoc.huertohogarbackend.repository.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderController(OrderRepository orderRepository,
                           OrderItemRepository orderItemRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    // Cliente crea una orden a partir del carrito
    @PostMapping
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<?> createOrder(@Valid @RequestBody CreateOrderRequest request,
                                         Authentication authentication) {

        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (request.getItems() == null || request.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("La orden debe tener al menos un item");
        }

        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        Order order = new Order();
        order.setUser(user);
        order.setStatus("CREADA");
        order.setCreatedAt(LocalDateTime.now());

        order = orderRepository.save(order);

        for (OrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + itemReq.getProductId()));

            BigDecimal priceUnit = product.getPrice();
            BigDecimal lineTotal = priceUnit.multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            total = total.add(lineTotal);

            // disminuir stock
            if (product.getStock() != null) {
                int newStock = product.getStock() - itemReq.getQuantity();
                product.setStock(newStock);
                productRepository.save(product);
            }

            OrderItem item = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemReq.getQuantity())
                    .priceUnit(priceUnit)
                    .build();
            items.add(orderItemRepository.save(item));
        }

        order.setTotal(total);
        order.setItems(items);
        orderRepository.save(order);

        return ResponseEntity.ok(order);
    }

    // Cliente ve sus propias órdenes
    @GetMapping("/my")
    @PreAuthorize("hasRole('CLIENTE')")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        List<Order> orders = orderRepository.findByUser(user);
        return ResponseEntity.ok(orders);
    }

    // Admin/Vendedor ven todas las órdenes
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','VENDEDOR')")
    public ResponseEntity<List<Order>> getAll() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    // Admin/Vendedor ven detalle por id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','VENDEDOR')")
    public ResponseEntity<Order> getById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
