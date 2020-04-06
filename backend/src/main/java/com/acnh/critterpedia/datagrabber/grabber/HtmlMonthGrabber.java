package com.acnh.critterpedia.datagrabber.grabber;

import com.acnh.critterpedia.model.Months;
import org.jsoup.nodes.Element;

import java.util.List;

public interface HtmlMonthGrabber {
    List<Months> grab(Element firstElement);
}
