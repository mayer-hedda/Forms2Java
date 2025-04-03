package com.test.forms.Modell;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class Item {
    
    @JacksonXmlProperty(localName = "Name", isAttribute = true)
    private String name;

    @JacksonXmlProperty(localName = "Prompt", isAttribute = true)
    private String prompt;

    @JacksonXmlProperty(localName = "ColumnName", isAttribute = true)
    private String columnName;

    // Getterek és setterek
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }

    public String getColumnName() { return columnName; }
    public void setColumnName(String columnName) { this.columnName = columnName; }
    
}
