# News

Lazy man's CMS + 11ty news feed

## Development

### CMS

Install dependencies.

~~~bash
cd cms
npm install
apt-get install rclone # or download from https://rclone.org/downloads/
~~~

Start WebDAV server.

~~~bash
cd cms
npm run webdav
~~~

(In another terminal) Start CORS proxy to the WebDAV server.

~~~bash
cd cms
npm run proxy
~~~

(In another terminal) Start development server.

~~~bash
cd cms
npm run server
~~~

Initialize data folder and `pl.json`.

~~~bash
cd cms/dist
echo '{"authors": [], "posts": [], "photos": []}' > pl.json
ln -s ../../11ty/src/_data/photo photo
ln -s ../../11ty/src/_data/posts post
~~~

### 11ty (Static site generator)

Install dependencies.

~~~bash
cd 11ty
npm install
~~~

Start 11ty development server.
~~~bash
cd 11ty
npm run serve
~~~
