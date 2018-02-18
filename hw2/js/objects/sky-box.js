function createSkyBox(size, textures) {

    var cube = new THREE.BoxGeometry(size, size, size);
    var tex = new THREE.CubeTextureLoader().load(textures);

    var shaderInput = {
        skyBox: { type: "t", value: tex },
    }

    var material = new THREE.ShaderMaterial({
        uniforms: shaderInput,
        vertexShader: skyBoxVShader,
        fragmentShader: skyBoxFShader
    });

    material.side = THREE.BackSide;

    var mesh = new THREE.Mesh(cube, material)

    mesh.Start = function () {
        mesh.position.z = -5;
    }

    mesh.Update = function() {
        // mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.01;
        // mesh.rotation.z += 0.05;
    }

    return mesh;
}
