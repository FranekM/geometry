$(document).ready(() => {
    var scene = new THREE.Scene()

    var camera = new THREE.PerspectiveCamera(50, $(window).width()/$(window).height(), 0.1, 10000)
    camera.position.set(0,200,200)
    camera.lookAt(scene.position)

    // var cameraO = new THREE.OrthographicCamera($(window).width()/-2, $(window).width()/2, 
    //                                         $(window).height()/2, $(window).height()/-2, 0.1, 10000)
    // cameraO.position.set(0,200,200)
    // cameraO.lookAt(scene.position)

    var renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0x000000)
    renderer.setSize($(window).width(), $(window).height())
    $('#root').append(renderer.domElement)

    var controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.minDistance = 10
    controls.maxDistance = 1000

    // var controlsO = new THREE.OrbitControls(cameraO, renderer.domElement)
    // controlsO.minZoom = 1
    // controlsO.maxZoom = 10000

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

    // var perspective = $('#perspective').is(':checked')
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

    // $('#perspective').on('change', (e) => {
    //     perspective = $(e.target).is(':checked')
    // })

    $('#height').on('input', (e) => {
        height = $('#height').val()
        create()
    })

    $('#base').on('input', (e) => {
        gons = $(e.target).val()
        if (gons < 3) gons = 3
        if (gons > 24) gons = 24
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
        //controlsO.update()

        requestAnimationFrame(render)
        renderer.render(scene, camera)//perspective ? camera : cameraO)
    }

    render()

})