package com.ecommerce.project.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    String resourceName;//Table Name
    String filedName;//Column name
    String field;
    Long fieldId;

    public ResourceNotFoundException(){

    }

    public ResourceNotFoundException(String resourceName, String filedName, String field) {
        super(String.format("%s not found with %s : %s", resourceName, filedName, field));
        this.resourceName = resourceName;
        this.filedName = filedName;
        this.field = field;
    }

    public ResourceNotFoundException(String resourceName, String filedName, Long fieldId) {
        super(String.format("%s not found with %s : %d", resourceName, filedName, fieldId));
        this.resourceName = resourceName;
        this.filedName = filedName;
        this.fieldId = fieldId;
    }

}
