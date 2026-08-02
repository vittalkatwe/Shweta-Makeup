const express = require('express');

const {
  META_MARKETING_TOKEN,
  META_AD_ACCOUNT_ID,
  getMetaAdsCache,
  setMetaAdsCache,
  EXCLUDED_META_CAMPAIGN_IDS,
} = require('../services/meta-ads');

const router = express.Router();

// ── Meta Ads: campaign summary ─────────────────────────────
router.get('/summary', async (req, res, next) => {
  try {
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    let sinceStr, untilStr;
    if (dateFrom && dateTo) {
      sinceStr = dateFrom;
      untilStr = dateTo;
    } else {
      const IST_OFFSET = 330 * 60 * 1000;
      const days = Math.min(90, Math.max(1, parseInt(req.query.days) || 30));
      const nowIST = new Date(Date.now() + IST_OFFSET);
      untilStr = nowIST.toISOString().slice(0, 10);
      const since = new Date(Date.now() + IST_OFFSET - days * 86400000);
      sinceStr = since.toISOString().slice(0, 10);
    }
    const cacheKey = `summary_${sinceStr}_${untilStr}`;
    const cached = getMetaAdsCache(cacheKey);
    if (cached) return res.json(cached);

    const params = new URLSearchParams({
      fields: 'campaign_name,campaign_id,spend,impressions,clicks,reach,cpm,cpc,ctr,frequency,inline_link_clicks,actions',
      level: 'campaign',
      time_range: JSON.stringify({ since: sinceStr, until: untilStr }),
      access_token: META_MARKETING_TOKEN,
    });

    const url = `https://graph.facebook.com/v19.0/act_${META_AD_ACCOUNT_ID}/insights?${params}`;
    const metaRes = await fetch(url);
    const metaJson = await metaRes.json();

    if (metaJson.error) {
      req.log.error({ error: metaJson.error }, 'Meta Ads API error');
      return res.status(502).json({ success: false, message: metaJson.error.message });
    }

    const campaigns = (metaJson.data || []).map(c => {
      const purchaseAction = (c.actions || []).find(a => a.action_type === 'purchase');
      const lpvAction = (c.actions || []).find(a => a.action_type === 'landing_page_view');
      const spend = parseFloat(c.spend || 0);
      const purchases = purchaseAction ? parseInt(purchaseAction.value || 0) : 0;
      const landingPageViews = lpvAction ? parseInt(lpvAction.value || 0) : 0;
      return {
        campaignId: c.campaign_id,
        campaignName: c.campaign_name,
        spend,
        impressions: parseInt(c.impressions || 0),
        clicks: parseInt(c.clicks || 0),
        reach: parseInt(c.reach || 0),
        cpm: parseFloat(c.cpm || 0),
        cpc: parseFloat(c.cpc || 0),
        ctr: parseFloat(c.ctr || 0),
        frequency: parseFloat(c.frequency || 0),
        linkClicks: parseInt(c.inline_link_clicks || 0),
        purchases,
        costPerPurchase: purchases > 0 ? spend / purchases : 0,
        landingPageViews,
        costPerLandingPageView: landingPageViews > 0 ? spend / landingPageViews : 0,
      };
    });

    const filteredCampaigns = campaigns.filter(c => !EXCLUDED_META_CAMPAIGN_IDS.has(c.campaignId));
    const totalSpend = filteredCampaigns.reduce((s, c) => s + c.spend, 0);
    const result = { success: true, totalSpend, campaigns: filteredCampaigns };
    setMetaAdsCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ── Meta Ads: daily spend ──────────────────────────────────
router.get('/daily', async (req, res, next) => {
  try {
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    let sinceStr, untilStr;
    if (dateFrom && dateTo) {
      sinceStr = dateFrom;
      untilStr = dateTo;
    } else {
      const IST_OFFSET = 330 * 60 * 1000;
      const days = Math.min(90, Math.max(1, parseInt(req.query.days) || 30));
      const nowIST = new Date(Date.now() + IST_OFFSET);
      untilStr = nowIST.toISOString().slice(0, 10);
      const since = new Date(Date.now() + IST_OFFSET - days * 86400000);
      sinceStr = since.toISOString().slice(0, 10);
    }
    const cacheKey = `daily_${sinceStr}_${untilStr}`;
    const cached = getMetaAdsCache(cacheKey);
    if (cached) return res.json(cached);

    const params = new URLSearchParams({
      fields: 'spend,date_start',
      time_increment: '1',
      time_range: JSON.stringify({ since: sinceStr, until: untilStr }),
      filtering: JSON.stringify([{
        field: 'campaign.id',
        operator: 'NOT_IN',
        value: Array.from(EXCLUDED_META_CAMPAIGN_IDS),
      }]),
      access_token: META_MARKETING_TOKEN,
    });

    const url = `https://graph.facebook.com/v19.0/act_${META_AD_ACCOUNT_ID}/insights?${params}`;
    const metaRes = await fetch(url);
    const metaJson = await metaRes.json();

    if (metaJson.error) {
      req.log.error({ error: metaJson.error }, 'Meta Ads API error');
      return res.status(502).json({ success: false, message: metaJson.error.message });
    }

    const daily = (metaJson.data || []).map(d => ({
      date: d.date_start,
      spend: parseFloat(d.spend || 0),
    }));

    const result = { success: true, daily };
    setMetaAdsCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ── Meta Ads: adsets for a campaign ───────────────────────
router.get('/campaign/:campaignId/adsets', async (req, res, next) => {
  try {
    const { campaignId } = req.params;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    let sinceStr, untilStr;
    if (dateFrom && dateTo) {
      sinceStr = dateFrom;
      untilStr = dateTo;
    } else {
      const IST_OFFSET = 330 * 60 * 1000;
      const days = Math.min(90, Math.max(1, parseInt(req.query.days) || 30));
      const nowIST = new Date(Date.now() + IST_OFFSET);
      untilStr = nowIST.toISOString().slice(0, 10);
      const since = new Date(Date.now() + IST_OFFSET - days * 86400000);
      sinceStr = since.toISOString().slice(0, 10);
    }
    const cacheKey = `adsets_${campaignId}_${sinceStr}_${untilStr}`;
    const cached = getMetaAdsCache(cacheKey);
    if (cached) return res.json(cached);

    const params = new URLSearchParams({
      fields: 'adset_id,adset_name,campaign_id,spend,impressions,clicks,reach,cpm,cpc,ctr,frequency,inline_link_clicks,actions',
      level: 'adset',
      filtering: JSON.stringify([{ field: 'campaign.id', operator: 'EQUAL', value: campaignId }]),
      time_range: JSON.stringify({ since: sinceStr, until: untilStr }),
      access_token: META_MARKETING_TOKEN,
    });

    const url = `https://graph.facebook.com/v19.0/act_${META_AD_ACCOUNT_ID}/insights?${params}`;
    const metaRes = await fetch(url);
    const metaJson = await metaRes.json();

    if (metaJson.error) {
      req.log.error({ error: metaJson.error }, 'Meta Ads API error');
      return res.status(502).json({ success: false, message: metaJson.error.message });
    }

    const adsets = (metaJson.data || []).map(a => {
      const purchaseAction = (a.actions || []).find(x => x.action_type === 'purchase');
      const lpvAction = (a.actions || []).find(x => x.action_type === 'landing_page_view');
      const spend = parseFloat(a.spend || 0);
      const purchases = purchaseAction ? parseInt(purchaseAction.value || 0) : 0;
      const landingPageViews = lpvAction ? parseInt(lpvAction.value || 0) : 0;
      return {
        adsetId: a.adset_id,
        adsetName: a.adset_name,
        campaignId: a.campaign_id,
        spend,
        impressions: parseInt(a.impressions || 0),
        clicks: parseInt(a.clicks || 0),
        reach: parseInt(a.reach || 0),
        cpm: parseFloat(a.cpm || 0),
        cpc: parseFloat(a.cpc || 0),
        ctr: parseFloat(a.ctr || 0),
        frequency: parseFloat(a.frequency || 0),
        linkClicks: parseInt(a.inline_link_clicks || 0),
        purchases,
        costPerPurchase: purchases > 0 ? spend / purchases : 0,
        landingPageViews,
        costPerLandingPageView: landingPageViews > 0 ? spend / landingPageViews : 0,
      };
    });

    const totalSpend = adsets.reduce((s, a) => s + a.spend, 0);
    const result = { success: true, totalSpend, adsets };
    setMetaAdsCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ── Meta Ads: ads for an adset (with creatives) ────────────
router.get('/adset/:adsetId/ads', async (req, res, next) => {
  try {
    const { adsetId } = req.params;
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    let sinceStr, untilStr;
    if (dateFrom && dateTo) {
      sinceStr = dateFrom;
      untilStr = dateTo;
    } else {
      const IST_OFFSET = 330 * 60 * 1000;
      const days = Math.min(90, Math.max(1, parseInt(req.query.days) || 30));
      const nowIST = new Date(Date.now() + IST_OFFSET);
      untilStr = nowIST.toISOString().slice(0, 10);
      const since = new Date(Date.now() + IST_OFFSET - days * 86400000);
      sinceStr = since.toISOString().slice(0, 10);
    }
    const cacheKey = `ads_${adsetId}_${sinceStr}_${untilStr}`;
    const cached = getMetaAdsCache(cacheKey);
    if (cached) return res.json(cached);

    // Fetch insights
    const insightsParams = new URLSearchParams({
      fields: 'ad_id,ad_name,adset_id,spend,impressions,clicks,reach,cpm,cpc,ctr,frequency,inline_link_clicks,actions',
      level: 'ad',
      filtering: JSON.stringify([{ field: 'adset.id', operator: 'EQUAL', value: adsetId }]),
      time_range: JSON.stringify({ since: sinceStr, until: untilStr }),
      access_token: META_MARKETING_TOKEN,
    });
    const insightsUrl = `https://graph.facebook.com/v19.0/act_${META_AD_ACCOUNT_ID}/insights?${insightsParams}`;
    const insightsRes = await fetch(insightsUrl);
    const insightsJson = await insightsRes.json();

    if (insightsJson.error) {
      req.log.error({ error: insightsJson.error }, 'Meta Ads API error');
      return res.status(502).json({ success: false, message: insightsJson.error.message });
    }

    // Fetch creative info
    const creativeParams = new URLSearchParams({
      fields: 'id,name,creative{thumbnail_url,title,body}',
      filtering: JSON.stringify([{ field: 'adset.id', operator: 'EQUAL', value: adsetId }]),
      access_token: META_MARKETING_TOKEN,
    });
    const creativeUrl = `https://graph.facebook.com/v19.0/act_${META_AD_ACCOUNT_ID}/ads?${creativeParams}`;
    const creativeRes = await fetch(creativeUrl);
    const creativeJson = await creativeRes.json();

    // Build creative map by ad id
    const creativeMap = {};
    for (const ad of (creativeJson.data || [])) {
      creativeMap[ad.id] = ad.creative || {};
    }

    const ads = (insightsJson.data || []).map(a => {
      const purchaseAction = (a.actions || []).find(x => x.action_type === 'purchase');
      const lpvAction = (a.actions || []).find(x => x.action_type === 'landing_page_view');
      const spend = parseFloat(a.spend || 0);
      const purchases = purchaseAction ? parseInt(purchaseAction.value || 0) : 0;
      const landingPageViews = lpvAction ? parseInt(lpvAction.value || 0) : 0;
      const creative = creativeMap[a.ad_id] || {};
      return {
        adId: a.ad_id,
        adName: a.ad_name,
        adsetId: a.adset_id,
        spend,
        impressions: parseInt(a.impressions || 0),
        clicks: parseInt(a.clicks || 0),
        reach: parseInt(a.reach || 0),
        cpm: parseFloat(a.cpm || 0),
        cpc: parseFloat(a.cpc || 0),
        ctr: parseFloat(a.ctr || 0),
        frequency: parseFloat(a.frequency || 0),
        linkClicks: parseInt(a.inline_link_clicks || 0),
        purchases,
        costPerPurchase: purchases > 0 ? spend / purchases : 0,
        landingPageViews,
        costPerLandingPageView: landingPageViews > 0 ? spend / landingPageViews : 0,
        thumbnailUrl: creative.thumbnail_url || null,
        title: creative.title || null,
        body: creative.body || null,
      };
    });

    const totalSpend = ads.reduce((s, a) => s + a.spend, 0);
    const result = { success: true, totalSpend, ads };
    setMetaAdsCache(cacheKey, result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
