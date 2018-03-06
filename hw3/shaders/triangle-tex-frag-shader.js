var triangTexFShader = `
    uniform sampler2D texture;

    varying vec2 v_uv;
    varying vec3 v_pos;

    void main() {

        gl_FragColor = texture2D(texture, v_uv);
        // gl_FragColor = vec4(v_uv.x,0.0,0.0,1.0);
    }
`;
