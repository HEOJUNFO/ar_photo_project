export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            '../textures/environmentMap/px.jpg',
            '../textures/environmentMap/nx.jpg',
            '../textures/environmentMap/py.jpg',
            '../textures/environmentMap/ny.jpg',
            '../textures/environmentMap/pz.jpg',
            '../textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: '../textures/dirt/color.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: '../textures/dirt/normal.jpg'
    },
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: '../models/Fox/glTF/Fox.gltf'
    },
    {
        name: 'bellModel1',
        type: 'gltfModel',
        path: '../models/Bell/TheFlash_BELL_SD_03-001.gltf'
    },{
        name: 'sorinaModel1',
        type: 'gltfModel',
        path: '../models/Sorina/TheFlash_Sorina_SD_03-001.gltf'
    },{
        name: 'unoModel1',
        type: 'gltfModel',
        path: '../models/Uno/TheFlash_Uno_SD_03-001.gltf'
    },{
        name: 'treeModel',
        type: 'gltfModel',
        path: '../models/intro/Tree.gltf'
    },
    // {
    //     name:'exr',
    //     type:'exrTexture',
    //     path:'https://storage.googleapis.com/donmccurdy-static/footprint_court_2k.exr'
    // }
]