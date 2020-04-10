package com.acnh.critterpedia.datagrabber.grabber;

public interface HtmlLargeImageGrabber {
    String grab(String detailsPageLink, String fallback);
}
