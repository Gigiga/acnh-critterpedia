package com.acnh.critterpedia.datagrabber.grabber;

import com.acnh.critterpedia.model.CatchTime;
import org.jsoup.nodes.Element;

public interface HtmlCatchTimeGrabber {
    CatchTime grab(Element northernHemisphereElement, Element southernHemisphereElement);
}
