<div align="center"> 

# Volsa2 gui
  
<img width="794" alt="image" src="./volsa2gui.png">
A simple app for managing Volca Sample 2 files on linux
</div>

## About

⚠️ The app is build on top [VolSa 2](https://github.com/00nktk/volsa2) and will NOT work if you don't install it correctly, **Volsa2 gui** assumes `volsa2-cli` is reachable at `/home/$USER/.cargo/bin/`

protip: install `volsa2-cli` with cargo, it's easier.

This app is "linux only", it may compiles on windows and macos but as it uses **VolSa 2**, you can't do anything with it from window or macos.

The app uses `aplay` command from `alsa` to play sounds. It's not mandatory but necessary if you want to hear your samples from within the app.

Feel free to submit pull requests or suggestions. Be warned, the code is a ~~total mess~~ personnal project.

## Usage

1. Power up and USB plug your **Volca Sample 2**
2. Launch the app
3. Click "📃 list" button to get *Volca* samples list
4. Click "📂 folder" button to select a *working directory*
5. Click an item "↧ download" button to save sound from *Volca* to *working directory*
6. Drag one or multiples *wav* files from your desktop on *slots*
7. Click the "⟲ revert" button for reverting your changes
8. Click the "♪ play" button to listen to the downloaded or new dragged sample
9. Click the "↥ upload" button to upload sample to *volca*
10. Click the "⨯ remove" button to empty a slot on the *volca*

Don't try to upload some weird things as PDF files or PNG... Use it at your own risk !

## Todos

- [ ] Bulk upload
- [ ] Bulk download
- [ ] Test files format
- [ ] Add mono/left/right option
- [ ] .desktop file for deb
- [ ] Save last folder
- [ ] Settings
- [ ] Clean...
- [ ] Comments



## Developers starting guide
The app is based on this template : [electron-vue-template](git@github.com:Turbnok/volsa2gui.git). So you can check for more informations.

Clone this repository: `git clone git@github.com:Turbnok/volsa2gui.git`

### Install dependencies ⏬

```bash
nvm use 
npm install
```

### Start developing ⚒️

```bash
npm run dev
```
