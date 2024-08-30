product {
    id BIGINT
    name VARCHAR
    description text
    price DECIMAL
    
}


stock {
    id BIGINT
    product_id BIGINT Foreign Key (product_id) REFERENCES (id)
    quantity INT
    unit_type VARCHAR
    unit_price DECIMAL
    unit_quantity INT
    status VARCHAR
    reorder_level INT

}
