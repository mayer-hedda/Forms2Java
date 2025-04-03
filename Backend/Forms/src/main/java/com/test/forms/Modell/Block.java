package com.test.forms.Modell;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
public class Block {
    
    @JacksonXmlProperty(localName = "Name", isAttribute = true)
    private String name;

    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "Item")
    private List<Item> items;

    // Getterek és setterek
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<Item> getItems() { return items; }
    public void setItems(List<Item> items) { this.items = items; }
    
}
