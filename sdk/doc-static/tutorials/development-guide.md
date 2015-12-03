# Setup your development environment

## Checkout code

```bash
git clone https://github.com/adobebc/web-apps-sdk.git
git checkout -b web-apps-sdk-ui
git pull origin web-apps-sdk-ui
git submodule init
git submodule update
cd web-apps-sdk/sdk
npm install -d
```

### Build distribution

```bash
cd web-apps-sdk/sdk
node node_modules/.bin/grunt
ls dist/
```