package com.forms.Forms2Java.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.forms.Forms2Java.service.XmlService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/xml")
public class XmlController {

    private final XmlService xmlService;

    public XmlController(XmlService xmlService) {
        this.xmlService = xmlService;
    }

    // Betölt egy adott XML-t
    @GetMapping("/{name}")
    public ResponseEntity<String> getXmlByName(@PathVariable String name) {
        String xml;
        try {
            xml = xmlService.getXmlContent(name);
            return ResponseEntity.ok(xml);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("XML file not found");
        }
    }

    @GetMapping("/json/{name}")
    public ResponseEntity<Map<String, Object>> getXmlAsJson(@PathVariable String name) throws IOException {
        String xmlContent = xmlService.getXmlContent(name);

        // Alakítsuk JSON formátummá
        ObjectMapper xmlMapper = new XmlMapper();
        Map<String, Object> jsonData = xmlMapper.readValue(xmlContent, new TypeReference<Map<String, Object>>() {});

        return ResponseEntity.ok(jsonData);
    }

    @GetMapping("/json/all")
    public ResponseEntity<String> convertAllXmlToJson() {
        try {
            // Összes XML fájl lekérése
            List<String> xmlFiles = xmlService.getAllXmlFileNames();
            String destinationFolderPath = "C:/Users/Mayer Hedda/Documents/OraForms/Forms2Java/Frontend/forms-frontend/public/json_files/";

            ObjectMapper xmlMapper = new XmlMapper();
            ObjectMapper jsonMapper = new ObjectMapper();

            for (String fileName : xmlFiles) {
                // XML tartalom beolvasása
                String xmlContent = xmlService.readXmlFileContent(fileName);

                // Konvertálás Map-be (JSON formátumhoz)
                Map<String, Object> jsonMap = xmlMapper.readValue(xmlContent, new TypeReference<Map<String, Object>>() {});

                // JSON fájl mentése
                String jsonFileName = fileName.replace(".xml", ".json");
                File jsonFile = new File(destinationFolderPath, jsonFileName);
                try (FileWriter writer = new FileWriter(jsonFile)) {
                    jsonMapper.writerWithDefaultPrettyPrinter().writeValue(writer, jsonMap);
                }
            }

            return ResponseEntity.ok("All XML files successfully converted to JSON and saved in the destination folder.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while processing files: " + e.getMessage());
        }
    }

    @GetMapping("/list-json-files")
    public ResponseEntity<List<String>> getAllJsonFiles() {
        try {
            String destinationFolderPath = "C:/Users/Mayer Hedda/Documents/OraForms/Forms2Java/Frontend/forms-frontend/public/json_files/";
            File folder = new File(destinationFolderPath);
            File[] files = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".json"));

            if (files != null) {
                List<String> jsonFiles = Arrays.stream(files)
                        .map(File::getName)
                        .collect(Collectors.toList());
                return ResponseEntity.ok(jsonFiles);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Hiba, ha nem létezik a mappa, vagy nem találhatóak fájlok.
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Általános hiba
        }
    }



}
