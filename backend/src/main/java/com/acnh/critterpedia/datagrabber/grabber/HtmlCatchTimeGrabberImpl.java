package com.acnh.critterpedia.datagrabber.grabber;

import com.acnh.critterpedia.model.CatchTime;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HtmlCatchTimeGrabberImpl implements HtmlCatchTimeGrabber {
    @Autowired
    HtmlMonthGrabber monthGrabber;

    @Override
    public CatchTime grab(Element northernHemisphereElement, Element southernHemisphereElement) {
        CatchTime catchTime = new CatchTime();
        catchTime.setStartHour(extractStartHour(northernHemisphereElement.selectFirst("small").text()));
        catchTime.setEndHour(extractEndHour(northernHemisphereElement.selectFirst("small").text()));
        catchTime.setNorthernHemisphereMonths(monthGrabber.grab(northernHemisphereElement.nextElementSibling()));
        catchTime.setSouthernHemisphereMonths(monthGrabber.grab(southernHemisphereElement));
        return catchTime;
    }

    private int extractHour(String hourString) {
        String[] hourParts = hourString.trim().split(" ");
        int hour = Integer.parseInt(hourParts[0]);

        if ("PM".equals((hourParts[1]))) {
            hour += 12;
        }
        return hour;
    }

    private int extractStartHour(String text) {
        if ("All day".equals(text)) {
            return 0;
        }
        return extractHour(text.split("-")[0]);
    }

    private int extractEndHour(String text) {
        if ("All day".equals(text)) {
            return 24;
        }
        return extractHour(text.split("-")[1]);
    }
}
