package com.acnh.critterpedia.datagrabber.grabber;

import com.acnh.critterpedia.model.Months;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HtmlMonthGrabberImpl implements HtmlMonthGrabber {
    @Override
    public List<Months> grab(Element firstElement) {
        List<Months> months = new ArrayList<>();
        Element element = firstElement;
        for (Months.MonthsEnum month : Months.MonthsEnum.values()) {
            if (!"-".equals(element.text())) {
                months.add(new Months(month.getValue()));
            }
            element = element.nextElementSibling();
        }
        return months;
    }
}
