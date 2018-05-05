$(document).ready(() => {
    var scene = new THREE.Scene()

    var camera = new THREE.PerspectiveCamera(45, $(window).width()/$(window).height(), 0.1, 10000)
    camera.position.set(0,200,200)
    camera.lookAt(scene.position)

    var renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0x000000)
    renderer.setSize($(window).width(), $(window).height())
    $('#root').append(renderer.domElement)

    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    $(window).on('resize', () => {
        camera.aspect = $(window).width()/$(window).height()
        camera.updateProjectionMatrix()
        renderer.setSize($(window).width(), $(window).height())
    })

    $('#show').on('click', (e) => {
        var text = $(e.target).text()
        if (text == 'SHOW') {
            $(e.target).text('HIDE')
            $('#menu').show()
        } else {
            $(e.target).text('SHOW')
            $('#menu').hide()
        }

    })

    var line, mesh
    var mat = new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.5
    })
    var mat2 = new THREE.LineBasicMaterial({color: 0x000088})

    $('#base').on('input', (e) => {
        scene.remove(mesh, line)
        var geom = new THREE.CylinderBufferGeometry(50, 50, 100, e.target.value)
        var edges = new THREE.EdgesGeometry(geom)
        line = new THREE.LineSegments(edges, mat2)
        var geom2 = new THREE.CylinderBufferGeometry(49.9, 49.9, 99.9, e.target.value)
        mesh = new THREE.Mesh(geom2, mat)
        scene.add(mesh, line)
    })

    function render() {
        controls.update()

        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }

    render()

})