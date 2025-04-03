package com.test.forms.Service;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.test.forms.Modell.Block;
import com.test.forms.Modell.FormModule;
import com.test.forms.Modell.Item;
import com.test.forms.Modell.Module;
import java.io.File;
import java.io.IOException;


public class XMLParser {
    
    public static Module parseXML(String filePath) throws IOException {
        XmlMapper xmlMapper = new XmlMapper();
        return xmlMapper.readValue(new File(filePath), Module.class);
    }

    public static void main(String[] args) {
        try {
            Module module = parseXML("C:\\MODULE1_fmb.xml");

            System.out.println("XML verzió: " + module.getVersion());
            
            FormModule form = module.getFormModule();
            if (form == null) {
                System.out.println("FormModule nem található!");
                return;
            }

            System.out.println("Form neve: " + form.getName());

            for (Block block : form.getBlocks()) {
                System.out.println("Block neve: " + block.getName());
                for (Item item : block.getItems()) {
                    System.out.println("  Mező: " + item.getName() + " (" + item.getPrompt() + ")");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
}
