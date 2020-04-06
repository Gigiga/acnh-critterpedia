package com.acnh.critterpedia.datagrabber.grabber;

import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

@Component
public class HttpImageGrabberImpl implements HttpImageGrabber {
    @Override
    public String grab(String imageLink) {
        try {
            URL url = new URL(imageLink);
            BufferedImage image = ImageIO.read(url);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(image, "png", baos);
            String data = DatatypeConverter.printBase64Binary(baos.toByteArray());
            return "data:image/png;base64," + data;
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
