package com.acnh.critterpedia.datagrabber.extractor;

import com.acnh.critterpedia.datagrabber.grabber.HtmlCatchTimeGrabber;
import com.acnh.critterpedia.datagrabber.grabber.HttpImageGrabber;
import com.acnh.critterpedia.model.CatchTime;
import com.acnh.critterpedia.model.Fish;
import com.acnh.critterpedia.model.ShadowSize;
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
public class FishHtmlExtractor implements FishExtractor {
    @Autowired
    HttpImageGrabber imageGrabber;

    @Autowired
    HtmlCatchTimeGrabber catchTimeGrabber;

    @Override
    public List<Fish> extract() {
        List<Fish> allFish = new ArrayList<>();
        try {
            Document doc = Jsoup.connect("https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)").get();
            Element northernHemisphereTable = doc.selectFirst(".tabbertab[title=\"Northern Hemisphere\"] table table tbody");
            Element southernHemisphereTable = doc.selectFirst(".tabbertab[title=\"Southern Hemisphere\"] table table tbody");

            for (Element tableRow : northernHemisphereTable.select("tr")) {
                Elements tableData = tableRow.select("td");
                if (tableData.size() == 0) continue;

                Fish fish = new Fish();
                fish.setName(tableData.get(0).selectFirst("a").text());
                fish.setImage(imageGrabber.grab(tableData.get(1).selectFirst("a").attr("href")));
                fish.setPrice(Integer.parseInt(tableData.get(2).text()));
                fish.setLocation(translateLocation(tableData.get(3).text()));
                fish.setShadowSize(translateShadowSize(tableData.get(4).text()));

                System.out.println(escapeQuotes(fish.getName()));
                Element southernHemisphereTableRow = southernHemisphereTable.selectFirst("td a:matches((?i)^" + escapeQuotes(fish.getName()) + "$)").parent().parent();
                CatchTime catchTime = catchTimeGrabber.grab(tableData.get(5), southernHemisphereTableRow.select("td").get(6));
                fish.setCatchTime(catchTime);
                allFish.add(fish);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return allFish;
    }

    private String escapeQuotes(String text) {
        return text.replaceAll("'", "\\\\'").replaceAll("\"", "\\\\\"");
    }

    private Fish.LocationEnum translateLocation(String text) {
        switch (text) {
            case "River":
                return Fish.LocationEnum.RIVER;
            case "Pond":
                return Fish.LocationEnum.POND;
            case "River (Clifftop)":
            case "River (Clifftop) Pond":
                return Fish.LocationEnum.RIVER_CLIFFTOP;
            case "River (Mouth)":
                return Fish.LocationEnum.RIVER_MOUTH;
            case "Sea":
                return Fish.LocationEnum.SEA;
            case "Pier":
                return Fish.LocationEnum.PIER;
        }
        throw new RuntimeException("Invalid location " + text);
    }

    private ShadowSize translateShadowSize(String text) {
        switch (text) {
            case "1":
                return ShadowSize.ONE;
            case "2":
                return ShadowSize.TWO;
            case "3":
                return ShadowSize.THREE;
            case "4":
                return ShadowSize.FOUR;
            case "5":
                return ShadowSize.FIVE;
            case "6":
                return ShadowSize.SIX;
            case "Narrow":
                return ShadowSize.NARROW;
            case "6 (Fin)":
                return ShadowSize.SIX_FIN;
            case "4 (Fin)":
                return ShadowSize.FOUR_FIN;
        }
        throw new RuntimeException("Invalid shadow size " + text);
    }
}
