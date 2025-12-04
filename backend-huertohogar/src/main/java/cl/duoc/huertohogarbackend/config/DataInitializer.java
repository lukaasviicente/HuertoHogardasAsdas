package cl.duoc.huertohogarbackend.config;

import cl.duoc.huertohogarbackend.model.*;
import cl.duoc.huertohogarbackend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository,
                                      ProductRepository productRepository,
                                      PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = User.builder()
                        .email("admin@huerto.cl")
                        .password(passwordEncoder.encode("1234"))
                        .nombre("Admin")
                        .apellidos("Sistema")
                        .role(Role.ADMIN)
                        .build();

                User vendedor = User.builder()
                        .email("vendedor@huerto.cl")
                        .password(passwordEncoder.encode("1234"))
                        .nombre("Vendedor")
                        .apellidos("Huerto")
                        .role(Role.VENDEDOR)
                        .build();

                User cliente = User.builder()
                        .email("cliente@huerto.cl")
                        .password(passwordEncoder.encode("1234"))
                        .nombre("Cliente")
                        .apellidos("Prueba")
                        .role(Role.CLIENTE)
                        .build();

                userRepository.saveAll(List.of(admin, vendedor, cliente));
            }

            if (productRepository.count() == 0) {
                Product p1 = Product.builder()
                        .code("FR001")
                        .name("Manzanas Fuji")
                        .description("Dulces y crujientes, ideales para snacks y postres.")
                        .price(new BigDecimal("1990"))
                        .stock(100)
                        .stockCritico(10)
                        .category("Frutas Frescas")
                        .imageUrl("/images/manzanas.png")
                        .build();

                Product p2 = Product.builder()
                        .code("FR002")
                        .name("Naranjas Valencia")
                        .description("Jugosas, perfectas para jugos naturales.")
                        .price(new BigDecimal("1790"))
                        .stock(100)
                        .stockCritico(10)
                        .category("Frutas Frescas")
                        .imageUrl("/images/naranjas.png")
                        .build();

                Product p3 = Product.builder()
                        .code("VR001")
                        .name("Zanahorias Orgánicas")
                        .description("Cultivo sin pesticidas, sabor auténtico.")
                        .price(new BigDecimal("1290"))
                        .stock(80)
                        .stockCritico(10)
                        .category("Verduras")
                        .imageUrl("/images/zanahorias.png")
                        .build();

                productRepository.saveAll(List.of(p1, p2, p3));
            }
        };
    }
}
