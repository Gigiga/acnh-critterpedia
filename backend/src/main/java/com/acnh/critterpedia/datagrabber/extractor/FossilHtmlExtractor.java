package com.acnh.critterpedia.datagrabber.extractor;

import com.acnh.critterpedia.datagrabber.grabber.HtmlLargeImageGrabber;
import com.acnh.critterpedia.datagrabber.grabber.HttpImageGrabber;
import com.acnh.critterpedia.model.Fossil;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class FossilHtmlExtractor implements FossilExtractor {
    @Autowired
    HttpImageGrabber imageGrabber;

    @Autowired
    HtmlLargeImageGrabber largeImageGrabber;

    @Override
    public List<Fossil> extract() {
        List<Fossil> fossils = new ArrayList<>();
        try {
            Document doc = Jsoup.connect("https://animalcrossing.fandom.com/wiki/Fossils_(New_Horizons)").get();

            Element standaloneFossilTable = doc.selectFirst("span:contains(Stand-alone fossils)").parent().parent().parent().nextElementSibling().selectFirst("table tbody");
            fossils.addAll(extractFromTable(standaloneFossilTable));

            Element multiPartFossilTable = doc.selectFirst("span:contains(Multi-part fossils)").parent().parent().parent().nextElementSibling().selectFirst("table tbody");
            fossils.addAll(extractFromTable(multiPartFossilTable));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return fossils;
    }

    private List<Fossil> extractFromTable(Element table) {
        List<Fossil> fossils = new ArrayList<>();
        for (Element row : table.select("tr")) {
            Elements cells = row.select("td");
            if (cells.size() == 0) continue;

            Fossil fossil = new Fossil();
            Element nameLink = cells.get(0).selectFirst("a");
            fossil.setName(nameLink.text());
            fossil.setImage(imageGrabber.grab(cells.get(1).selectFirst("a").attr("href")));
            fossil.setLargeImage(largeImageGrabber.grab(nameLink.attr("abs:href"), fossil.getImage()));
            fossil.setPrice(Integer.parseInt(cells.get(2).text().replaceAll("[^0-9]", "")));
            fossils.add(fossil);
        }
        return fossils;
    }
}
