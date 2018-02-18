var skyBoxFShader = `
    varying vec3 v_pos;
    uniform samplerCube skyBox;

    void main() {
        gl_FragColor = textureCube(skyBox, v_pos);
        // gl_FragColor = vec4(1.0,1.0,1.0,1.0);
    }`;
