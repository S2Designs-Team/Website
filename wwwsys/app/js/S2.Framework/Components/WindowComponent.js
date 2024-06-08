import { BaseComponent } from './Core/BaseComponent.js';

export class WindowComponent extends BaseComponent {
    constructor(properties = {}, cssFileUrl = null) {
        super(properties, cssFileUrl);
        this.isDragging = false;
        this.isResizing = false;
        this.offset = { x: 0, y: 0 };
        this.originalSize = { width: 300, height: 200 };
        this.createWindow();
    }

    createWindow() {
        this.htmlSegment = `
            <div class="window" style="width: ${this.originalSize.width}px; height: ${this.originalSize.height}px;">
                <div class="titlebar">
                    <span>${this.getTitle()}</span>
                    <div class="buttons">
                        <button class="minimize">_</button>
                        <button class="maximize">[ ]</button>
                        <button class="close">X</button>
                    </div>
                </div>
                <div class="resize-handle"></div>
            </div>
        `;
    }

    addEventListeners(container) {
        const titlebar = container.querySelector('.titlebar');
        const resizeHandle = container.querySelector('.resize-handle');

        titlebar.addEventListener('mousedown', (e) => this.startDrag(e));
        resizeHandle.addEventListener('mousedown', (e) => this.startResize(e));
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mouseup', () => this.stopAction());

        titlebar.querySelector('.minimize').addEventListener('click', () => this.minimize());
        titlebar.querySelector('.maximize').addEventListener('click', () => this.maximize());
        titlebar.querySelector('.close').addEventListener('click', () => this.close());
    }

    startDrag(e) {
        this.isDragging = true;
        this.offset.x = e.clientX - this.container.offsetLeft;
        this.offset.y = e.clientY - this.container.offsetTop;
        this.container.classList.add('dragging');
    }

    startResize(e) {
        this.isResizing = true;
        this.resizeStart = { x: e.clientX, y: e.clientY };
        this.resizeOverlay = document.createElement('div');
        this.resizeOverlay.className = 'resize-overlay';
        this.resizeOverlay.style.width = `${this.container.offsetWidth}px`;
        this.resizeOverlay.style.height = `${this.container.offsetHeight}px`;
        this.resizeOverlay.style.left = `${this.container.offsetLeft}px`;
        this.resizeOverlay.style.top = `${this.container.offsetTop}px`;
        document.body.appendChild(this.resizeOverlay);
    }

    onMouseMove(e) {
        if (this.isDragging) {
            this.container.style.left = `${e.clientX - this.offset.x}px`;
            this.container.style.top = `${e.clientY - this.offset.y}px`;
        }

        if (this.isResizing) {
            const width = this.originalSize.width + (e.clientX - this.resizeStart.x);
            const height = this.originalSize.height + (e.clientY - this.resizeStart.y);
            this.resizeOverlay.style.width = `${width}px`;
            this.resizeOverlay.style.height = `${height}px`;
        }
    }

    stopAction() {
        if (this.isDragging) {
            this.isDragging = false;
            this.container.classList.remove('dragging');
        }

        if (this.isResizing) {
            this.isResizing = false;
            this.originalSize.width = parseInt(this.resizeOverlay.style.width, 10);
            this.originalSize.height = parseInt(this.resizeOverlay.style.height, 10);
            this.container.style.width = `${this.originalSize.width}px`;
            this.container.style.height = `${this.originalSize.height}px`;
            document.body.removeChild(this.resizeOverlay);
        }
    }

    minimize() {
        this.container.style.display = 'none';
    }

    maximize() {
        this.container.style.width = '100vw';
        this.container.style.height = '100vh';
        this.container.style.left = '0';
        this.container.style.top = '0';
    }

    close() {
        this.dispose();
    }

    /**
     * Metodo da sovrascrivere nelle classi derivate per fornire il titolo della finestra.
     */
    getTitle() {
        return 'Default Title';
    }

    render(parentId = null) {
        super.render(parentId);
    }
}
