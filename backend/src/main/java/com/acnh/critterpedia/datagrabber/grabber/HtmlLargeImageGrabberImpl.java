package com.acnh.critterpedia.datagrabber.grabber;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HtmlLargeImageGrabberImpl implements HtmlLargeImageGrabber {
    @Autowired
    HttpImageGrabber imageGrabber;

    @Override
    public String grab(String detailsPageLink, String fallback) {
        try {
            Document detailsPage = Jsoup.connect(detailsPageLink).get();
            Element imageElement = detailsPage.selectFirst("aside.portable-infobox figure a img");
            return imageGrabber.grab(imageElement.attr("src"));
        } catch (Exception ex) {
            System.out.println("Unable to load large image from details page " + detailsPageLink);
            ex.printStackTrace();
            return fallback;
        }
    }
}
