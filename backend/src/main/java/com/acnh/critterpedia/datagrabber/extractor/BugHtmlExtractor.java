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
        switch (text) {
            case "Flying":
                return Bug.LocationEnum.FLYING;
            case "Flying by Hybrid Flowers":
                return Bug.LocationEnum.FLYING_BY_HYBRID_FLOWERS;
            case "Flying by Light":
                return Bug.LocationEnum.FLYING_BY_LIGHT;
            case "On Trees":
                return Bug.LocationEnum.TREES;
            case "On the Ground":
                return Bug.LocationEnum.GROUND;
            case "On Flowers":
                return Bug.LocationEnum.FLOWERS;
            case "On Flowers (White)":
                return Bug.LocationEnum.WHITE_FLOWERS;
            case "Shaking Trees":
                return Bug.LocationEnum.SHAKING_TREES;
            case "Underground":
                return Bug.LocationEnum.UNDERGROUND;
            case "On Ponds and Rivers":
                return Bug.LocationEnum.POND_AND_RIVERS;
            case "On Tree Stumps":
                return Bug.LocationEnum.TREESTUMPS;
            case "On Trees (Coconut?)":
            case "On Trees (Coconut)":
                return Bug.LocationEnum.COCONUT_TREES;
            case "On the Ground (rolling snowballs)":
                return Bug.LocationEnum.GROUND_ROLLING_SNOWBALLS;
            case "Under Trees Disguised as Leafs":
                return Bug.LocationEnum.UNDER_TREES_DISGUISED_LEAFS;
            case "On rotten food":
                return Bug.LocationEnum.ROTTEN_FRUIT;
            case "Beach disguised as Shells":
                return Bug.LocationEnum.BEACH;
            case "On Beach Rocks":
                return Bug.LocationEnum.BEACH_ROCKS;
            case "On Trash Items":
                return Bug.LocationEnum.TRASH;
            case "Villager's Heads":
                return Bug.LocationEnum.VILLAGERS_HATS;
            case "On Rocks (Rain)":
                return Bug.LocationEnum.ROCKS_RAINING;
            case "Hitting Rocks":
                return Bug.LocationEnum.HITTING_ROCKS;
        }
        throw new RuntimeException("Invalid bug location: " + text);
    }
}
