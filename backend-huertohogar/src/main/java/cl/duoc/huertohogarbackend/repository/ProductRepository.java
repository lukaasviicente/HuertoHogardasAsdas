package cl.duoc.huertohogarbackend.repository;

import cl.duoc.huertohogarbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
