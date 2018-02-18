function createTexTriangle(tex_path) {

    var triangle = new THREE.Geometry();

    triangle.vertices.push(
	       new THREE.Vector3( -1,  1, 0 ),
	       new THREE.Vector3( -1, -1, 0 ),
           new THREE.Vector3(  1, -1, 0 )
      );

    triangle.faces.push( new THREE.Face3( 0, 1, 2 ) );
    triangle.faceVertexUvs[0].push([
        new THREE.Vector2(0.0, 1.0),
        new THREE.Vector2(0.0, 0.0),
        new THREE.Vector2(1.0, 0.0)]
    );

    var tex = new THREE.TextureLoader().load(tex_path);

    var shaderInput = {
        texture: { type: "t", value: tex },
    }

    var material = new THREE.ShaderMaterial({
        uniforms: shaderInput,
        vertexShader: texVShader,
        fragmentShader: triangTexFShader
    });

    var mesh = new THREE.Mesh(triangle, material)

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
