function createTexBox(w, h, d, tex_path) {

    var cube = new THREE.BoxGeometry(w, h, d);
    var tex = new THREE.TextureLoader().load(tex_path);

    var shaderInput = {
        texture: { type: "t", value: tex },
        size: {type: "v3", value: new THREE.Vector3(w,h,d)}
    }

    var material = new THREE.ShaderMaterial({
        uniforms: shaderInput,
        vertexShader: texVShader,
        fragmentShader: texFShader
    });

    var mesh = new THREE.Mesh(cube, material)

    mesh.Start = function () {
        mesh.position.z = -5;
    }

    mesh.Update = function() {
        // mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        // mesh.rotation.z += 0.05;
    }

    return mesh;
}
