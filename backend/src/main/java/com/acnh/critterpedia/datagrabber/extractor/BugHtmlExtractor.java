package com.acnh.critterpedia.datagrabber.extractor;

import com.acnh.critterpedia.datagrabber.grabber.HtmlCatchTimeGrabber;
import com.acnh.critterpedia.datagrabber.grabber.HtmlLargeImageGrabber;
import com.acnh.critterpedia.datagrabber.grabber.HttpImageGrabber;
import com.acnh.critterpedia.model.Bug;
import com.acnh.critterpedia.model.CatchTime;
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
public class BugHtmlExtractor implements BugExtractor {
    @Autowired
    HttpImageGrabber imageGrabber;

    @Autowired
    HtmlCatchTimeGrabber catchTimeGrabber;

    @Autowired
    HtmlLargeImageGrabber largeImageGrabber;

    @Override
    public List<Bug> extract() {
        List<Bug> bugs = new ArrayList<>();
        try {
            Document doc = Jsoup.connect("https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)").get();
            Element northernHemisphereTable = doc.selectFirst(".tabbertab[title=\"Northern Hemisphere\"] table table tbody");
            Element southernHemisphereTable = doc.selectFirst(".tabbertab[title=\"Southern Hemisphere\"] table table tbody");

            for (Element tableRow : northernHemisphereTable.select("tr")) {
                Elements tableData = tableRow.select("td");
                if (tableData.size() == 0) continue;

                Bug bug = new Bug();
                Element nameLink = tableData.get(0).selectFirst("a");
                bug.setName(nameLink.text());
                bug.setImage(imageGrabber.grab(tableData.get(1).selectFirst("a").attr("href")));
                bug.setLargeImage(largeImageGrabber.grab(nameLink.attr("abs:href"), bug.getImage()));
                bug.setPrice(Integer.parseInt(tableData.get(2).text()));
                bug.setLocation(translateLocation(tableData.get(3).text()));

                Element southernHemisphereTableRow = southernHemisphereTable.selectFirst("td a:matches((?i)^" + escapeQuotes(bug.getName()) + "$)").parent().parent();
                CatchTime catchTime = catchTimeGrabber.grab(tableData.get(4), southernHemisphereTableRow.select("td").get(5));
                bug.setCatchTime(catchTime);
                bugs.add(bug);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return bugs;
    }

    private String escapeQuotes(String text) {
        return text.replaceAll("'", "\\\\'").replaceAll("\"", "\\\\\"");
    }

    private Bug.LocationEnum translateLocation(String text) {
        switch (text.toLowerCase()) {
            case "flying":
                return Bug.LocationEnum.FLYING;
            case "flying by hybrid flowers":
                return Bug.LocationEnum.FLYING_BY_HYBRID_FLOWERS;
            case "flying by light":
                return Bug.LocationEnum.FLYING_BY_LIGHT;
            case "on trees":
                return Bug.LocationEnum.TREES;
            case "on the ground":
                return Bug.LocationEnum.GROUND;
            case "on flowers":
                return Bug.LocationEnum.FLOWERS;
            case "on flowers (white)":
                return Bug.LocationEnum.WHITE_FLOWERS;
            case "shaking trees":
                return Bug.LocationEnum.SHAKING_TREES;
            case "underground":
                return Bug.LocationEnum.UNDERGROUND;
            case "on ponds and rivers":
                return Bug.LocationEnum.POND_AND_RIVERS;
            case "on tree stumps":
                return Bug.LocationEnum.TREESTUMPS;
            case "on trees (coconut?)":
            case "on trees (coconut)":
                return Bug.LocationEnum.COCONUT_TREES;
            case "on the ground (rolling snowballs)":
                return Bug.LocationEnum.GROUND_ROLLING_SNOWBALLS;
            case "under trees disguised as leafs":
                return Bug.LocationEnum.UNDER_TREES_DISGUISED_LEAFS;
            case "on rotten food":
                return Bug.LocationEnum.ROTTEN_FRUIT;
            case "beach disguised as shells":
                return Bug.LocationEnum.BEACH;
            case "on beach rocks":
                return Bug.LocationEnum.BEACH_ROCKS;
            case "on trash items":
                return Bug.LocationEnum.TRASH;
            case "villager's heads":
                return Bug.LocationEnum.VILLAGERS_HATS;
            case "on rocks (rain)":
                return Bug.LocationEnum.ROCKS_RAINING;
            case "hitting rocks":
                return Bug.LocationEnum.HITTING_ROCKS;
            case "on rocks and bushes (rain)":
                return Bug.LocationEnum.ROCKS_BUSHES_RAINING;
        }
        throw new RuntimeException("Invalid bug location: " + text);
    }
}
