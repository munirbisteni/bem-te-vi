package com.bemtevi.bem_te_vi_api.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Document(collection = "logins")
@Data
public class Login {

    @Id
    private String id;
    private String userName;
    private String mail;
    private String password;

    @DBRef
    private User user;

}
