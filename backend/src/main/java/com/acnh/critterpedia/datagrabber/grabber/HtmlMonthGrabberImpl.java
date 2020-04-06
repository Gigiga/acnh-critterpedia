package com.acnh.critterpedia.datagrabber.grabber;

import com.acnh.critterpedia.model.Months;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
public class HtmlMonthGrabberImpl implements HtmlMonthGrabber {
    Map<Months.MonthsEnum, Months> months = new EnumMap<Months.MonthsEnum, Months>(Months.MonthsEnum.class);

    public HtmlMonthGrabberImpl() {
        for (Months.MonthsEnum month : Months.MonthsEnum.values()) {
            months.put(month, new Months(month.getValue()));
        }
    }

    @Override
    public List<Months> grab(Element firstElement) {
        List<Months> months = new ArrayList<>();
        Element element = firstElement;
        for (Months.MonthsEnum month : Months.MonthsEnum.values()) {
            if (!"-".equals(element.text())) {
                months.add(this.months.get(month));
            }
            element = element.nextElementSibling();
        }
        return months;
    }
}
