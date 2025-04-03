package com.test.forms.Service;

import com.test.forms.Modell.FormModule;
import com.test.forms.Modell.Module;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import java.io.*;
import java.util.*;


public class AngularGenerator {
    
    public static void generateAngularComponent(FormModule form) throws IOException, TemplateException {
        Configuration cfg = new Configuration(Configuration.VERSION_2_3_31);
        cfg.setClassForTemplateLoading(AngularGenerator.class, "/");
        cfg.setDefaultEncoding("UTF-8");

        Map<String, Object> data = new HashMap<>();
        data.put("formName", form.getName());
        data.put("blocks", form.getBlocks());

        // Angular projekt mappa (ezt állítsd be a tényleges Angular projekthez!)
        String angularProjectPath = "C:\\Users\\Mayer Hedda\\Documents\\OraForms\\Forms2Java\\Frontend\\forms-angular-app\\src\\app\\components\\generated\\";

        // Új mappa létrehozása a form neve alapján
        String formFolderPath = angularProjectPath + form.getName();
        File formFolder = new File(formFolderPath);
        if (!formFolder.exists()) {
            formFolder.mkdirs();  // Létrehozza az összes hiányzó mappát
        }
        
        // HTML generálás
        Template htmlTemplate = cfg.getTemplate("angular-template.html.ftl");
        File htmlOutput = new File(formFolder, form.getName().toLowerCase() + ".component.html");
        try (Writer writer = new FileWriter(htmlOutput)) {
            htmlTemplate.process(data, writer);
        }

        // CSS generálás
        Template cssTemplate = cfg.getTemplate("angular-template.css.ftl");
        File cssOutput = new File(formFolder, form.getName().toLowerCase() + ".component.css");
        try (Writer writer = new FileWriter(cssOutput)) {
            cssTemplate.process(data, writer);
        }

        // TypeScript generálás
        Template tsTemplate = cfg.getTemplate("angular-template.ts.ftl");
        File tsOutput = new File(formFolder, form.getName().toLowerCase() + ".component.ts");
        try (Writer writer = new FileWriter(tsOutput)) {
            tsTemplate.process(data, writer);
        }

        System.out.println("Angular fájlok generálva: " + htmlOutput.getAbsolutePath());
    }

    public static void main(String[] args) {
        try {
            Module module = XMLParser.parseXML("C:\\MODULE1_fmb.xml");
            FormModule form = module.getFormModule();

            generateAngularComponent(form);
        } catch (IOException | TemplateException e) {
            e.printStackTrace();
        }
    }
    
}
