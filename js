// --- Camera Zoom / Touch State ---
let cameraZoom = 1; // 1 = default, <1 closer, >1 further
const activeTouches = new Map();
const pinchState = {
    active: false,
    startDist: 0,
    startZoom: 1
};

// Helper to compute distance between first two active touches
function getTouchDistance() {
// ... existing code ...
}

// --- Player Loading ---
const loader = new FBXLoader();
// ... existing code ...

// --- Input Handling ---
const raycaster = new THREE.Raycaster();
// ... existing code ...

function onPointerMove(event) {
    if (event.pointerType === 'touch' && activeTouches.has(event.pointerId)) {
        activeTouches.set(event.pointerId, { x: event.clientX, y: event.clientY });

        if (pinchState.active && activeTouches.size >= 2) {
            const currentDist = getTouchDistance();
            if (currentDist > 10) { // threshold
                const scale = pinchState.startDist / currentDist;
                // Invert scale so pinching fingers together zooms IN (camera closer)
                const newZoom = pinchState.startZoom / scale;
                cameraZoom = Math.min(2.5, Math.max(0.5, newZoom));
            }
        }
    }
}

function onPointerUp(event) {
// ... existing code ...
}

// Mouse wheel zoom support
window.addEventListener('wheel', (event) => {
    // Zoom out (deltaY > 0) -> increase cameraZoom (further)
    // Zoom in (deltaY < 0) -> decrease cameraZoom (closer)
    const sensitivity = 0.001;
    cameraZoom += event.deltaY * sensitivity;
    cameraZoom = Math.min(2.5, Math.max(0.5, cameraZoom));
});

// --- Player & Camera Update ---
function updatePlayer(delta) {
// ... existing code ...
}

function updateCamera() {
    const player = state.player;
    if (!player.mesh) return;

    // Simple isometric follow with zoom
    const baseOffset = new THREE.Vector3(20, 25, 20);
    const offset = baseOffset.clone().multiplyScalar(cameraZoom);
    const desiredPos = new THREE.Vector3().addVectors(player.pos, offset);

    camera.position.copy(desiredPos);
    camera.lookAt(player.pos.x, player.pos.y, player.pos.z);
}

// --- Resize Handling ---
function onWindowResize() {
// ... existing code ...
}

// --- UI Stub ---
// ... existing code ...

// --- Main Loop ---
// ... existing code ...

