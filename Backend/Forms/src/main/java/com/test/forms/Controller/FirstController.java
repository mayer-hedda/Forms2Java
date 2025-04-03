package com.test.forms.Controller;

import com.test.forms.Service.Forms2XmlConverter;
import com.test.forms.Service.JdapiInitializer;
import com.test.forms.Service.XMLUtils;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import oracle.forms.jdapi.JdapiModule;
import org.w3c.dom.Document;


@Path("first")
public class FirstController {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of FirstController
     */
    public FirstController() {
    }

    /**
     * Retrieves representation of an instance of com.test.forms.FirstController
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of FirstController
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void putXml(String content) {
    }
    
    @GET
    @Path("teszt")
    public Response teszt() {
        return Response.status(Response.Status.OK).entity("JAVA LIBRARY: " + System.getProperty("java.library.path")).build();
    }
    
    
    
    @GET
    @Path("convertFormsToXML")
    @Produces(MediaType.APPLICATION_XML)
    public Response convertFormsToXML() {
        try {
            // JDAPI inicializálása
            JdapiInitializer.initialize();

            // Beégetett FMB fájl elérési útja
            String fmbFilePath = "C:\\MODULE1.fmb";

            // Betöltjük az FMB fájlt
            JdapiModule module = JdapiModule.openModule(fmbFilePath);

            if (module == null) {
                return Response.status(Response.Status.BAD_GATEWAY)
                        .entity("<error>FMB file not found</error>")
                        .build();
            }

            // Forms2XML konverzió
            Forms2XmlConverter converter = new Forms2XmlConverter(module);
            Document doc = converter.convert();

            // XML visszaadása szövegként
            String xmlString = XMLUtils.convertDocumentToString(doc);

            return Response.ok(xmlString, MediaType.APPLICATION_XML).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("<error>Conversion failed" + e.getMessage() + "</error>")
                    .build();
        } finally {
            JdapiInitializer.shutdown();
        }
    }
}
