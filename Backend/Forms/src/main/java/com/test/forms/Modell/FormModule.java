package com.test.forms.Modell;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
public class FormModule {
    
    @JacksonXmlProperty(localName = "Name", isAttribute = true)
    private String name;

    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "Block")
    private List<Block> blocks;

    // Getterek és setterek
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<Block> getBlocks() { return blocks; }
    public void setBlocks(List<Block> blocks) { this.blocks = blocks; }
    
}
