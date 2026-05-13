# Channel Image Sizes

Updated: 2026-05-09

This file is the workflow-level size decision table for GanFan / SorryCode article images.

## Principle

Do not guess image ratio inside the prompt. Choose the target channel first, then generate the closest stable source image and crop/export to the exact delivery size.

## Delivery presets

| Use case | Output size | Ratio | Notes |
| --- | ---: | ---: | --- |
| X Article cover | `1500x600` | `5:2` | X Article UI explicitly asks for a `5:2` cover. Keep title and key visual inside the central band. |
| X single image post | `1200x675` | `16:9` | Use when the image is the post visual. If the composition is text-heavy, keep margins generous. |
| X card / link preview cover | `1200x675` | `16:9` | Good default for feed-safe cards and reusable social visuals. |
| WeChat public account cover | `900x383` | `2.35:1` | Common public-account article cover ratio. Design with strong horizontal composition. |
| WeChat share thumbnail | `500x500` | `1:1` | Square crop used for small share contexts; do not put critical text near edges. |
| SorryCode docs hero | `1200x675` | `16:9` | Use unless the site component specifies another crop. |

## Image2 source-size mapping

`sorrycode-image2` owns API execution. This skill chooses a source size that is close enough for cropping.

| Delivery target | Preferred Image2 source size | Fallback |
| --- | --- | --- |
| `1500x600` | `1500x600` | regenerate; do not start from `1536x1024` unless the operator explicitly accepts heavy cropping |
| `1200x675` | `1536x1024` | `1024x1024`, then crop/pad manually if needed |
| `900x383` | `1536x1024` | `1024x1024`, then crop/pad manually if needed |
| `500x500` | `1024x1024` | `auto` |

Use community high-resolution sizes only when the user explicitly asks for high-res output or when prior project evidence confirms the route supports it. Do not silently use experimental sizes.

## Safe-area rules

- Keep the main title inside the central 80% width and 75% height.
- For WeChat `900x383`, keep important text inside central 80% width and 65% height because thumbnails and cards crop aggressively.
- For X Article `1500x600`, keep critical text inside the central 75% width and 60% height; the UI asks for a `5:2` cover.
- For X single-image `1200x675`, keep faces, titles, and product labels away from the outer 8% edges.
- If both X Article and other channels are needed, generate the X Article cover separately at `1500x600`; do not reuse a `1536x1024` social card as the X Article source.

## Source notes

- X: current public social-size references consistently recommend `1200x675` for single-image X posts and feed-safe cover images. However, X Article editor UI explicitly asks for a `5:2` cover; GanFan uses `1500x600` for X Article covers and keeps `1200x675` for normal X image posts/cards.
- WeChat: public-account cover references and design template platforms consistently list `900x383` for the main/first article cover and square thumbnails for secondary/share contexts. GanFan uses `900x383` and `500x500` as operational defaults unless the publisher UI changes.
- Treat these as operational standards, not API guarantees. If the platform UI changes, update this file and `channels/profiles/*.yaml`.

## Reference links

- X Developer Platform, Summary Card with Large Image: `https://developer.x.com/cards/types/summary-large-image` — official card spec, supports a 2:1 image ratio with minimum `300x157` and max `4096x4096`.
- Makepx Social Media Image Sizes 2026: `https://makepx.com/` — operational social-size reference listing X in-feed image `1200x675` and large summary card `1200x628`.
- Canva China WeChat Official Account sizes: `https://www.canva.cn/sizes/wechat-official-account/` — public design-template reference listing WeChat official account cover `900x383`.
- Uecloud WeChat cover guide: `https://www.uecloud.com/geo/article/MXzd` — current public new-media reference listing first article cover `900x383` and secondary covers as square.
