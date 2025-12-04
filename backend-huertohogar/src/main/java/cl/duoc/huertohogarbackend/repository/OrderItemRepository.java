package cl.duoc.huertohogarbackend.repository;

import cl.duoc.huertohogarbackend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
