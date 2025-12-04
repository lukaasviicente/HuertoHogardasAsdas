package cl.duoc.huertohogarbackend.dto;

import cl.duoc.huertohogarbackend.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String nombre;

    @NotBlank
    private String apellidos;

    private Role role = Role.CLIENTE;
}
