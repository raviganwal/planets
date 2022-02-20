import React, { useEffect } from "react";
import * as THREE from "three";
let camera, scene, renderer, sphere, cloudMesh;
const ThreeCube = () => {
    useEffect(() => {
        init();
        animate();
        window.addEventListener('resize', onWindowResize, false);

        window.addEventListener('mouseup', onMouseUp, false);
    }, []);

    return (
        <>
            <div></div>
        </>
    );
};

function init() {
    // Init scene
    scene = new THREE.Scene();

    // Init camera (PerspectiveCamera)
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // Init renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // Set size (whole window)
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Render to canvas element
    document.body.appendChild(renderer.domElement);


    // ambient light

    scene.add(new THREE.AmbientLight(0xffffff, 1));

    // point light

    const light = new THREE.PointLight(0xffffff, 1);
    camera.add(light);

    // Init BoxGeometry object (rectangular cuboid)
    const geometry = new THREE.SphereGeometry(1, 32, 32)

    // Create material with color
    // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    // // Create material with texture
    const material = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('http://learningthreejs.com/data/2013-09-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthmap1k.jpg'),
        bumpMap: new THREE.TextureLoader().load('http://learningthreejs.com/data/2013-09-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthbump1k.jpg'),
        bumpScale: 0.5,
        specularMap: new THREE.TextureLoader().load('http://learningthreejs.com/data/2013-09-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthspec1k.jpg'),
        specular: 0x858585,
        side: THREE.DoubleSide,
        // shininess: 10,
    });

    // Create mesh with geo and material
    sphere = new THREE.Mesh(geometry, material);
    // Add to scene

    scene.add(sphere);



    const geometry1 = new THREE.SphereGeometry(1.1, 32, 32)

    // Create material with color
    // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    // // Add texture - 
    const texture1 = new THREE.TextureLoader().load('http://learningthreejs.com/data/2013-09-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthcloudmap.jpg');
    // // Create material with texture
    const material1 = new THREE.MeshPhongMaterial({
        map: texture1,
        specularMap: new THREE.TextureLoader().load('http://learningthreejs.com/data/2013-09-16-how-to-make-the-earth-in-webgl/demo/bower_components/threex.planets/images/earthcloudmaptrans.jpg'),
        specular: 0x858585,
        side: THREE.DoubleSide,
        opacity: 0.7,
        transparent: true,
        depthWrite: false,
    });

    cloudMesh = new THREE.Mesh(geometry1, material1)

    sphere.add(cloudMesh)

    sphere.add(new THREE.AxisHelper(10)); // to show the local coordinate system


    // Position camera
    camera.position.z = 5;

    
}

// Draw the scene every time the screen is refreshed
function animate() {
    requestAnimationFrame(animate);

    // Rotate sphere (Change values to change speed)
    sphere.rotation.x += 0.000;
    sphere.rotation.y += 0.002;
    cloudMesh.rotation.y += 0.005;

    renderer.render(scene, camera);
}

function onMouseUp() {
    requestAnimationFrame(animate);

    // Rotate sphere (Change values to change speed)
    sphere.position.z += 0.005;
    cloudMesh.position.z += 0.005;

    renderer.render(scene, camera);
}


function onWindowResize() {
    // Camera frustum aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // After making changes to aspect
    camera.updateProjectionMatrix();
    // Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);
}


export default ThreeCube;