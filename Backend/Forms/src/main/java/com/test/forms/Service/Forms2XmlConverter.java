package com.test.forms.Service;

import oracle.forms.jdapi.JdapiModule;
import oracle.forms.util.xmltools.Forms2XML;
import org.w3c.dom.Document;


public class Forms2XmlConverter extends Forms2XML {
    
    public Forms2XmlConverter(JdapiModule module) {
        super(module);
    }
    
    public Document convert() throws Exception {
        return dumpModule();
    }
    
}
