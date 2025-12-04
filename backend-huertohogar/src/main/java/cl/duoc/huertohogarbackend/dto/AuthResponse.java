package cl.duoc.huertohogarbackend.dto;

import cl.duoc.huertohogarbackend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String nombre;
    private String apellidos;
    private Role role;
}
