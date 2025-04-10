package com.forms.Forms2Java.service;

import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class XmlService {

    private static final String XML_DIRECTORY = "src/main/resources/xml/";

    // Betölti az adott nevű XML tartalmát
    public String getXmlContent(String fileName) throws IOException {
        Path filePath = Paths.get(XML_DIRECTORY + fileName + ".xml");
        if (!Files.exists(filePath)) {
            throw new FileNotFoundException("XML file not found: " + fileName);
        }
        return Files.readString(filePath);
    }

    // Összes XML fájl neveinek lekérdezése
    public List<String> getAllXmlFileNames() throws IOException {
        Path directoryPath = Paths.get(XML_DIRECTORY);
        if (!Files.exists(directoryPath) || !Files.isDirectory(directoryPath)) {
            throw new FileNotFoundException("XML directory not found: " + XML_DIRECTORY);
        }

        return Files.list(directoryPath)
                .filter(Files::isRegularFile)
                .map(path -> path.getFileName().toString())
                .filter(fileName -> fileName.endsWith(".xml"))
                .collect(Collectors.toList());
    }

    // Adott XML fájl teljes tartalmának betöltése
    public String readXmlFileContent(String fileName) throws IOException {
        Path filePath = Paths.get(XML_DIRECTORY).resolve(fileName);
        if (!Files.exists(filePath)) {
            throw new FileNotFoundException("File not found: " + fileName);
        }
        return Files.readString(filePath);
    }
}