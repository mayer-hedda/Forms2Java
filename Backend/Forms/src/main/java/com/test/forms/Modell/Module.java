package com.test.forms.Modell;

import com.fasterxml.jackson.dataformat.xml.annotation.*;


@JacksonXmlRootElement(localName = "Module")
public class Module {
    
    @JacksonXmlProperty(localName = "version", isAttribute = true)
    private String version;
    
    @JacksonXmlProperty(localName = "FormModule")
    private FormModule formModule;

    // Getterek és Setterek
    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public FormModule getFormModule() { return formModule; }
    public void setFormModule(FormModule formModule) { this.formModule = formModule; }
}
