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

    var height = $('#height').val()
    var gons = $('#base').val()
    var type = $('#type').val() == 'prism'
    var line, mesh
    var mat = new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.3
    })
    var lmat = new THREE.LineBasicMaterial({
        color: 0x0000ff
    })

    $('#height').on('input', (e) => {
        height = $('#height').val()
        create()
    })

    $('#base').on('input', (e) => {
        gons = $(e.target).val()
        create()
    })

    $('#type').on('change', (e) => {
        type = $(e.target).val() == 'prism'
        create()
    })

    function create() {
        scene.remove(mesh, line)
        var geom = new THREE.CylinderBufferGeometry(type ? 50 : 0, 50, height, gons)
        var edges = new THREE.EdgesGeometry(geom)
        line = new THREE.LineSegments(edges, lmat)
        var geom = new THREE.CylinderBufferGeometry(type ? 49.9 : 0, 49.9, height-0.1, gons)
        mesh = new THREE.Mesh(geom, mat)
        scene.add(mesh, line)
    }

    create()

    function render() {
        controls.update()

        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }

    render()

})