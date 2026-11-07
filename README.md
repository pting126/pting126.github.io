# Ting-Yu Pan’s personal website

Static academic homepage and music portfolio, published at https://pting126.github.io/ through GitHub Pages from the `main` branch.

- `index.html`: introduction, research interests, publications, projects, and contact.
- `music_portfolio.html`: performances, compositions, and ensemble work.
- `assets/site.css` and `assets/site.js`: homepage styles and accessible mobile navigation.
- `assets/Ting-Yu_Pan_CV.pdf`: public CV. Replace this file to update the CV while keeping all existing links working.
- `files/`: existing music and image assets.

Preview locally with `python3 -m http.server 8765 --bind 127.0.0.1` and open http://127.0.0.1:8765/.

The homepage requires no build step or external JavaScript dependencies. The music portfolio retains its existing Tailwind and Lucide CDN dependencies.
