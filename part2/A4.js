/*
 * UBC CPSC 314, Vjan2019
 * Assignment 4 Template
 */

// CHECK WEBGL VERSION
if ( WEBGL.isWebGL2Available() === false ) {
  document.body.appendChild( WEBGL.getWebGL2ErrorMessage() );
}

// Setup renderer
var container = document.createElement( 'div' );
document.body.appendChild( container );

var canvas = document.createElement("canvas");
var context = canvas.getContext( 'webgl2' );
var renderer = new THREE.WebGLRenderer( { canvas: canvas, context: context } );
renderer.setClearColor(0X808080); // background colour
container.appendChild( renderer.domElement );

// Adapt backbuffer to window size
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  shadowMap_Camera.aspect = window.innerWidth / window.innerHeight;
  shadowMap_Camera.updateProjectionMatrix();
}

// Hook up to event listener
window.addEventListener('resize', resize);
window.addEventListener('vrdisplaypresentchange', resize, true);

// Disable scrollbar function
window.onscroll = function() {
  window.scrollTo(0, 0);
}

var deltaTime;
var clock = new THREE.Clock(true);
var particleSystem1;
var particleSystem2;
var particleSystem3;
var particleSystem4;

particleSystem1 = createParticleSystem1();
particleSystem2 = createParticleSystem2();
particleSystem3 = createParticleSystem3();
particleSystem4 = createParticleSystem4();

//Layer 1
function createParticleSystem1() {

   // The number of particles in this particle system
   var particleCount = 15000;

   // Create the geometry that will hold all of the vertices of raindrops
   var particles1 = new THREE.Geometry();

   // Create the vertices and add them to the particles geometry
   for (var p = 0; p < particleCount; p++) {

       // This will create all the vertices in a range of -200 to 200 in X, 100 to 200 in Y, and -100 to 50 in Z
       var x = Math.random() * 400 - 200;
       var y = Math.random() * 100 + 100;
       var z = Math.random() * 150 - 100;

       // Create the vertex
       var particle = new THREE.Vector3(x, y, z);

       // Add the vertex to the geometry
       particles1.vertices.push(particle);
   }
 // Create the material that will be used to render each vertex of the geometry
   var particleMaterial1 = new THREE.PointsMaterial(
           {color: 0xffffffff,
            size: 1.5,
          map: new THREE.TextureLoader().load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAIOCAYAAACxsI2jAAAFU0lEQVR4nO1dwU7sMAx0m4KQUM8rfoAv2f8/c+PMHjkgQNuWU1C2tLHj8TbJUl+exGNnnTR1xmMnNEQ0EWAt8uEdoHiApmno7u6OmqbRATw8PNDhcKDHx8coUEMLK7FpGur7np6fn8k5R+/v7/T6+kqfn59yD6Zpor7v6Xg80vF4pL7vF3+vWwMgInLO0dPT0+8wlox9Cn7sa3PAAkzT5RTNgQpeSKGFbs+HVMkQVAB+rOqXKbQYyDZzMH90IgBu7Eke7AA5ASSPkgVomobatr34WRKAc46cc/qg2rZtAS+TGgB6Cjf8NiYtpGmaouEsCuA/PI7jnxAfesF6MAwDDcOwuk+I+ME4julDiO3ISR5wtj2AmGAsjdv/LPy/63kgtehj5Egm64GPyBCAc+4irCfPQdu2WFhnv2AHyED3xQCSiMx64EHUIW0pKicBEBGN46iLyqEXlUblcgmGanNVewBzZYmxSxlOPKE5kJhYQ4E8qJjuEwFzIAmoIg84L0Rpn8oDz07grM05R13X6QgGzJEkdn2A/K+zCUCevdGEoXhuEPKDZK48DMNF8pnkgc8ZK2UoMMEwjYmmABWp+z6kQ7tzqOapAIj2vJGI32ALHoLJ2whF5TBnhPNGdVANo3JyWPfPfz6E/1RrMwWoNPkmMko84YBSsYJhCqCeRJPsnbPCAeBK11LemEyyoHpj6MWabZP2/de30ZTuQ/wA8mBeb1QB5Fe2OdsBigaQpHysB5LcURSV1UHVpI3EA6k8gOOBxCoBUIW0q+WNSe0DJmEdUvOI6DesJ3vgl29efmCSsVSsbK92SGvkwFjLaYWTqJqDWEfMNvVGCMCk2mcmBy6tie0nMUnJggjGUt6YPAcmBGPeKZsMwNkOUHxMLEfZzp83QgylvK1tewCTqJyv6usjMrS1QWLcnjcuW546U6WTKInIrAcmTRxwWA+HoSLbnCXnTEkexOidCAD2wBxAxVRNPcgHAIvzlbZQXA0g+URV3j4Us8q3GsCTCyhr45pdr0txJLYDFA9gkjfeSL3xhrb3HQAAgHam/LIwDFBGF8jeEQVEpPn4k5Iur6HApXO45dqEoUCNrjcmB6qKNLAHsILBgVTCUPIH1YoBzMS4vIknfBAGyp3N7sWpNG8s49R55VraDd3AoO6Iklrhiafkep+C52AtFlZ0QNIEAFZx/L9QkSbvDQymxbrKD4nmUTBCdgIxlK7r9Gd9/bdD0jhn1wfIr2BwOkoSxUlOPKG0T2rRmMidshV5ADEUk+I9ZwXvTFKQwucABoDPN8K30oRqnhrA64l5OqK4D4s9gAH29gElgI+HkAfwDQxExh1RKgDOtpFAKlY0zUQY0znYtkPSJG8MbdvmPu6bxQDm+8K2AkT+Zl9Y2Tbp2VYr2yFHUt85LzGRJKoGCIFUAGUK03DRNrk/kTNWGoeV7fP5fEEwkudgHEe9sj0vmavKxnmztrxLuYw605IlLSQuZ2QByqg3cqJk4UyVqOqb+0wAoNb7MITB9UbVDQxhHwp8A0PMCs/ayiQY+QDUsrCJB7F7AArf3ssBgKIyF9bEjzFv8R7aXMvJG9UA8FEc9gvKByhDW68UYC1vTGLrIcGAOqLUdwuHnqxZ4SUSU4aSJyaGploH8BwsReQkggHnjSbHD/aQBgBIJOEogI+F+dvKYDVPfWG7B4D7VG+Ard/AEOYm3t69JKyag2ma6Ovri06nE318fET5werfOj+fz3Q6nejl5YWIiL6/vxd/ryH6++favd3f39PhcCAiore3t0WQKEB41Zkv4P9R+2MAS4AQwJJVuBJ3gB1gBygV4AeT2N3vbwAzfAAAAABJRU5ErkJggg=="),
            blending: THREE.AdditiveBlending,
            transparent: true,
      opacity: 0.8,
           });

 // Create the particle system
   particleSystem1 = new THREE.Points(particles1, particleMaterial1);
 return particleSystem1;
}
//Layer 2
function createParticleSystem2() {

   // The number of particles in this particle system
  var particleCount = 15000;

   // Create the geometry that will hold all of the vertices of raindrops
 var particles2 = new THREE.Geometry();

   // Create the vertices and add them to the particles geometry
   for (var p = 0; p < particleCount; p++) {

       // This will create all the vertices in a range of -200 to 200 in X,  0 to 100 in Y, and -100 and 50 in Z
       var x = Math.random() * 400 - 200;
       var y = Math.random() * 100;
       var z = Math.random() * 150 - 100;

       // Create the vertex
       var particle = new THREE.Vector3(x, y, z);

       // Add the vertex to the geometry
       particles2.vertices.push(particle);
   }
 var particleMaterial2 = new THREE.PointsMaterial(
   {color: 0xffffffff,
    size: 1.5,
        map: new THREE.TextureLoader().load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAIOCAYAAACxsI2jAAAFU0lEQVR4nO1dwU7sMAx0m4KQUM8rfoAv2f8/c+PMHjkgQNuWU1C2tLHj8TbJUl+exGNnnTR1xmMnNEQ0EWAt8uEdoHiApmno7u6OmqbRATw8PNDhcKDHx8coUEMLK7FpGur7np6fn8k5R+/v7/T6+kqfn59yD6Zpor7v6Xg80vF4pL7vF3+vWwMgInLO0dPT0+8wlox9Cn7sa3PAAkzT5RTNgQpeSKGFbs+HVMkQVAB+rOqXKbQYyDZzMH90IgBu7Eke7AA5ASSPkgVomobatr34WRKAc46cc/qg2rZtAS+TGgB6Cjf8NiYtpGmaouEsCuA/PI7jnxAfesF6MAwDDcOwuk+I+ME4julDiO3ISR5wtj2AmGAsjdv/LPy/63kgtehj5Egm64GPyBCAc+4irCfPQdu2WFhnv2AHyED3xQCSiMx64EHUIW0pKicBEBGN46iLyqEXlUblcgmGanNVewBzZYmxSxlOPKE5kJhYQ4E8qJjuEwFzIAmoIg84L0Rpn8oDz07grM05R13X6QgGzJEkdn2A/K+zCUCevdGEoXhuEPKDZK48DMNF8pnkgc8ZK2UoMMEwjYmmABWp+z6kQ7tzqOapAIj2vJGI32ALHoLJ2whF5TBnhPNGdVANo3JyWPfPfz6E/1RrMwWoNPkmMko84YBSsYJhCqCeRJPsnbPCAeBK11LemEyyoHpj6MWabZP2/de30ZTuQ/wA8mBeb1QB5Fe2OdsBigaQpHysB5LcURSV1UHVpI3EA6k8gOOBxCoBUIW0q+WNSe0DJmEdUvOI6DesJ3vgl29efmCSsVSsbK92SGvkwFjLaYWTqJqDWEfMNvVGCMCk2mcmBy6tie0nMUnJggjGUt6YPAcmBGPeKZsMwNkOUHxMLEfZzp83QgylvK1tewCTqJyv6usjMrS1QWLcnjcuW546U6WTKInIrAcmTRxwWA+HoSLbnCXnTEkexOidCAD2wBxAxVRNPcgHAIvzlbZQXA0g+URV3j4Us8q3GsCTCyhr45pdr0txJLYDFA9gkjfeSL3xhrb3HQAAgHam/LIwDFBGF8jeEQVEpPn4k5Iur6HApXO45dqEoUCNrjcmB6qKNLAHsILBgVTCUPIH1YoBzMS4vIknfBAGyp3N7sWpNG8s49R55VraDd3AoO6Iklrhiafkep+C52AtFlZ0QNIEAFZx/L9QkSbvDQymxbrKD4nmUTBCdgIxlK7r9Gd9/bdD0jhn1wfIr2BwOkoSxUlOPKG0T2rRmMidshV5ADEUk+I9ZwXvTFKQwucABoDPN8K30oRqnhrA64l5OqK4D4s9gAH29gElgI+HkAfwDQxExh1RKgDOtpFAKlY0zUQY0znYtkPSJG8MbdvmPu6bxQDm+8K2AkT+Zl9Y2Tbp2VYr2yFHUt85LzGRJKoGCIFUAGUK03DRNrk/kTNWGoeV7fP5fEEwkudgHEe9sj0vmavKxnmztrxLuYw605IlLSQuZ2QByqg3cqJk4UyVqOqb+0wAoNb7MITB9UbVDQxhHwp8A0PMCs/ayiQY+QDUsrCJB7F7AArf3ssBgKIyF9bEjzFv8R7aXMvJG9UA8FEc9gvKByhDW68UYC1vTGLrIcGAOqLUdwuHnqxZ4SUSU4aSJyaGploH8BwsReQkggHnjSbHD/aQBgBIJOEogI+F+dvKYDVPfWG7B4D7VG+Ard/AEOYm3t69JKyag2ma6Ovri06nE318fET5werfOj+fz3Q6nejl5YWIiL6/vxd/ryH6++favd3f39PhcCAiore3t0WQKEB41Zkv4P9R+2MAS4AQwJJVuBJ3gB1gBygV4AeT2N3vbwAzfAAAAABJRU5ErkJggg=="),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.7,
 });

 // Create the particle system
   particleSystem2 = new THREE.Points(particles2, particleMaterial2);
 return particleSystem2;
}
//Layer 3
function createParticleSystem3() {

   // The number of particles in this particle system
   var particleCount = 15000;
   // Create the geometry that will hold all of the vertices of raindrops
 var particles3 = new THREE.Geometry();

   // Create the vertices and add them to the particles geometry
   for (var p = 0; p < particleCount; p++) {

       // This will create all the vertices in a range of -200 to 200 in X, -100 to 0 in Y, and -100 and 50 in Z
       var x = Math.random() * 400 - 200;
       var y = Math.random() * -100;
       var z = Math.random() * 150 - 100;

       // Create the vertex
       var particle = new THREE.Vector3(x, y, z);

       // Add the vertex to the geometry
       particles3.vertices.push(particle);
   }
 var particleMaterial3 = new THREE.PointsMaterial(
   {color: 0xffffffff,
   size: 1.5,
     map: new THREE.TextureLoader().load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAIOCAYAAACxsI2jAAAFU0lEQVR4nO1dwU7sMAx0m4KQUM8rfoAv2f8/c+PMHjkgQNuWU1C2tLHj8TbJUl+exGNnnTR1xmMnNEQ0EWAt8uEdoHiApmno7u6OmqbRATw8PNDhcKDHx8coUEMLK7FpGur7np6fn8k5R+/v7/T6+kqfn59yD6Zpor7v6Xg80vF4pL7vF3+vWwMgInLO0dPT0+8wlox9Cn7sa3PAAkzT5RTNgQpeSKGFbs+HVMkQVAB+rOqXKbQYyDZzMH90IgBu7Eke7AA5ASSPkgVomobatr34WRKAc46cc/qg2rZtAS+TGgB6Cjf8NiYtpGmaouEsCuA/PI7jnxAfesF6MAwDDcOwuk+I+ME4julDiO3ISR5wtj2AmGAsjdv/LPy/63kgtehj5Egm64GPyBCAc+4irCfPQdu2WFhnv2AHyED3xQCSiMx64EHUIW0pKicBEBGN46iLyqEXlUblcgmGanNVewBzZYmxSxlOPKE5kJhYQ4E8qJjuEwFzIAmoIg84L0Rpn8oDz07grM05R13X6QgGzJEkdn2A/K+zCUCevdGEoXhuEPKDZK48DMNF8pnkgc8ZK2UoMMEwjYmmABWp+z6kQ7tzqOapAIj2vJGI32ALHoLJ2whF5TBnhPNGdVANo3JyWPfPfz6E/1RrMwWoNPkmMko84YBSsYJhCqCeRJPsnbPCAeBK11LemEyyoHpj6MWabZP2/de30ZTuQ/wA8mBeb1QB5Fe2OdsBigaQpHysB5LcURSV1UHVpI3EA6k8gOOBxCoBUIW0q+WNSe0DJmEdUvOI6DesJ3vgl29efmCSsVSsbK92SGvkwFjLaYWTqJqDWEfMNvVGCMCk2mcmBy6tie0nMUnJggjGUt6YPAcmBGPeKZsMwNkOUHxMLEfZzp83QgylvK1tewCTqJyv6usjMrS1QWLcnjcuW546U6WTKInIrAcmTRxwWA+HoSLbnCXnTEkexOidCAD2wBxAxVRNPcgHAIvzlbZQXA0g+URV3j4Us8q3GsCTCyhr45pdr0txJLYDFA9gkjfeSL3xhrb3HQAAgHam/LIwDFBGF8jeEQVEpPn4k5Iur6HApXO45dqEoUCNrjcmB6qKNLAHsILBgVTCUPIH1YoBzMS4vIknfBAGyp3N7sWpNG8s49R55VraDd3AoO6Iklrhiafkep+C52AtFlZ0QNIEAFZx/L9QkSbvDQymxbrKD4nmUTBCdgIxlK7r9Gd9/bdD0jhn1wfIr2BwOkoSxUlOPKG0T2rRmMidshV5ADEUk+I9ZwXvTFKQwucABoDPN8K30oRqnhrA64l5OqK4D4s9gAH29gElgI+HkAfwDQxExh1RKgDOtpFAKlY0zUQY0znYtkPSJG8MbdvmPu6bxQDm+8K2AkT+Zl9Y2Tbp2VYr2yFHUt85LzGRJKoGCIFUAGUK03DRNrk/kTNWGoeV7fP5fEEwkudgHEe9sj0vmavKxnmztrxLuYw605IlLSQuZ2QByqg3cqJk4UyVqOqb+0wAoNb7MITB9UbVDQxhHwp8A0PMCs/ayiQY+QDUsrCJB7F7AArf3ssBgKIyF9bEjzFv8R7aXMvJG9UA8FEc9gvKByhDW68UYC1vTGLrIcGAOqLUdwuHnqxZ4SUSU4aSJyaGploH8BwsReQkggHnjSbHD/aQBgBIJOEogI+F+dvKYDVPfWG7B4D7VG+Ard/AEOYm3t69JKyag2ma6Ovri06nE318fET5werfOj+fz3Q6nejl5YWIiL6/vxd/ryH6++favd3f39PhcCAiore3t0WQKEB41Zkv4P9R+2MAS4AQwJJVuBJ3gB1gBygV4AeT2N3vbwAzfAAAAABJRU5ErkJggg=="),
   blending: THREE.AdditiveBlending,
   transparent: true,
   opacity: 0.6,
   });
 // Create the particle system
 particleSystem3 = new THREE.Points(particles3, particleMaterial3);
 return particleSystem3;
}
//Layer 4
function createParticleSystem4() {

   // The number of particles in this particle system
   var particleCount = 15000;
   // Create the geometry that will hold all of the vertices of raindrops
 var particles4 = new THREE.Geometry();

   // Create the vertices and add them to the particles geometry
   for (var p = 0; p < particleCount; p++) {

       // This will create all the vertices in a range of -200 to 200 in X, -200 to -100 in Y and -100 and 50 in Z
       var x = Math.random() * 400 - 200;
       var y = Math.random() * -100 - 100;
       var z = Math.random() * 150 - 100;

       // Create the vertex
       var particle = new THREE.Vector3(x, y, z);

   // Add the vertex to the geometry
       particles4.vertices.push(particle);
 }
   var particleMaterial4 = new THREE.PointsMaterial(
     {color: 0xffffffff,
     size: 1.5,
     map: new THREE.TextureLoader().load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAIOCAYAAACxsI2jAAAFU0lEQVR4nO1dwU7sMAx0m4KQUM8rfoAv2f8/c+PMHjkgQNuWU1C2tLHj8TbJUl+exGNnnTR1xmMnNEQ0EWAt8uEdoHiApmno7u6OmqbRATw8PNDhcKDHx8coUEMLK7FpGur7np6fn8k5R+/v7/T6+kqfn59yD6Zpor7v6Xg80vF4pL7vF3+vWwMgInLO0dPT0+8wlox9Cn7sa3PAAkzT5RTNgQpeSKGFbs+HVMkQVAB+rOqXKbQYyDZzMH90IgBu7Eke7AA5ASSPkgVomobatr34WRKAc46cc/qg2rZtAS+TGgB6Cjf8NiYtpGmaouEsCuA/PI7jnxAfesF6MAwDDcOwuk+I+ME4julDiO3ISR5wtj2AmGAsjdv/LPy/63kgtehj5Egm64GPyBCAc+4irCfPQdu2WFhnv2AHyED3xQCSiMx64EHUIW0pKicBEBGN46iLyqEXlUblcgmGanNVewBzZYmxSxlOPKE5kJhYQ4E8qJjuEwFzIAmoIg84L0Rpn8oDz07grM05R13X6QgGzJEkdn2A/K+zCUCevdGEoXhuEPKDZK48DMNF8pnkgc8ZK2UoMMEwjYmmABWp+z6kQ7tzqOapAIj2vJGI32ALHoLJ2whF5TBnhPNGdVANo3JyWPfPfz6E/1RrMwWoNPkmMko84YBSsYJhCqCeRJPsnbPCAeBK11LemEyyoHpj6MWabZP2/de30ZTuQ/wA8mBeb1QB5Fe2OdsBigaQpHysB5LcURSV1UHVpI3EA6k8gOOBxCoBUIW0q+WNSe0DJmEdUvOI6DesJ3vgl29efmCSsVSsbK92SGvkwFjLaYWTqJqDWEfMNvVGCMCk2mcmBy6tie0nMUnJggjGUt6YPAcmBGPeKZsMwNkOUHxMLEfZzp83QgylvK1tewCTqJyv6usjMrS1QWLcnjcuW546U6WTKInIrAcmTRxwWA+HoSLbnCXnTEkexOidCAD2wBxAxVRNPcgHAIvzlbZQXA0g+URV3j4Us8q3GsCTCyhr45pdr0txJLYDFA9gkjfeSL3xhrb3HQAAgHam/LIwDFBGF8jeEQVEpPn4k5Iur6HApXO45dqEoUCNrjcmB6qKNLAHsILBgVTCUPIH1YoBzMS4vIknfBAGyp3N7sWpNG8s49R55VraDd3AoO6Iklrhiafkep+C52AtFlZ0QNIEAFZx/L9QkSbvDQymxbrKD4nmUTBCdgIxlK7r9Gd9/bdD0jhn1wfIr2BwOkoSxUlOPKG0T2rRmMidshV5ADEUk+I9ZwXvTFKQwucABoDPN8K30oRqnhrA64l5OqK4D4s9gAH29gElgI+HkAfwDQxExh1RKgDOtpFAKlY0zUQY0znYtkPSJG8MbdvmPu6bxQDm+8K2AkT+Zl9Y2Tbp2VYr2yFHUt85LzGRJKoGCIFUAGUK03DRNrk/kTNWGoeV7fP5fEEwkudgHEe9sj0vmavKxnmztrxLuYw605IlLSQuZ2QByqg3cqJk4UyVqOqb+0wAoNb7MITB9UbVDQxhHwp8A0PMCs/ayiQY+QDUsrCJB7F7AArf3ssBgKIyF9bEjzFv8R7aXMvJG9UA8FEc9gvKByhDW68UYC1vTGLrIcGAOqLUdwuHnqxZ4SUSU4aSJyaGploH8BwsReQkggHnjSbHD/aQBgBIJOEogI+F+dvKYDVPfWG7B4D7VG+Ard/AEOYm3t69JKyag2ma6Ovri06nE318fET5werfOj+fz3Q6nejl5YWIiL6/vxd/ryH6++favd3f39PhcCAiore3t0WQKEB41Zkv4P9R+2MAS4AQwJJVuBJ3gB1gBygV4AeT2N3vbwAzfAAAAABJRU5ErkJggg=="),
     blending: THREE.AdditiveBlending,
     transparent: true,
     opacity: 0.5,
     });

 // Create the particle system
   particleSystem4 = new THREE.Points(particles4, particleMaterial4);

   return particleSystem4;
}

// Add scene
var depthScene = new THREE.Scene(); // shadow map
var finalScene = new THREE.Scene(); // final map

var lightDirection = new THREE.Vector3(0.49,0.79,0.49);

// Shadow map camera
// TODO: change the shadowMap_camera for scene that creates shadow map
var shadowMapWidth = 10;
var shadowMapHeight = 10;
var shadowMap_Camera = new THREE.OrthographicCamera(-8, 8, 8, -8, 1, 1000);


// TODO: set the camera's lookAt and then add at it to the scene
shadowMap_Camera.position.set(10.0, 10.0, 10.0);
// I added this code myself.
shadowMap_Camera.lookAt(new THREE.Vector3(0));
depthScene.add(shadowMap_Camera);


// Main camera
var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000); // view angle, aspect ratio, near, far
camera.position.set(0,10,20);
camera.lookAt(finalScene.position);
finalScene.add(camera);

// COMMENT BELOW FOR VR CAMERA
// ------------------------------

// Giving camera some controls
cameraControl = new THREE.OrbitControls(camera);
cameraControl.damping = 0.2;
cameraControl.autoRotate = false;
// ------------------------------
// COMMENT ABOVE FOR VR CAMERA


// UNCOMMENT BELOW FOR VR CAMERA
// ------------------------------
// Apply VR headset positional data to camera.
 //var controls = new THREE.VRControls(camera);
 //controls.standing = true;

 // Apply VR stereo rendering to renderer.
 //var effect = new THREE.VREffect(renderer);
 //effect.setSize(window.innerWidth, window.innerHeight);

 //var display;

// // Create a VR manager helper to enter and exit VR mode.
 //var params = {
//   hideButton: false, // Default: false.
//   isUndistorted: false // Default: false.
// };
 //var manager = new WebVRManager(renderer, effect, params);
// ------------------------------
// UNCOMMENT ABOVE FOR VR CAMERA


// XYZ axis helper
var worldFrame = new THREE.AxesHelper(2);
finalScene.add(worldFrame);

/*

var particleGroup = new SPE.Group({
  texture: {
    value: rainTexture
  },
  fog: true
});

var emitter = new SPE.Emitter({
  maxAge: {
    value: 5
  },
  position: {
    value: new THREE.Vector3(0, 5, 0),
    spread: new THREE.Vector3(9, 0, 9)
  },
  acceleration: {
    value: new THREE.Vector3(0, -5, 0),
  },
  velocity: {
    value: new THREE.Vector3(0, -5, 0),
    spread: new THREE.Vector3(0.5, -0.01, 0.2)
  },
  color: {
    value: [ new THREE.Color(0x5196d8)]
  },
  opacity: {
    value: [0.8, 0.8]
  },
  rotation: {
    value: [-1, -10]
  },
  size: {
    value: [0.05, -  0.01],
    spread: [0.05, 0.1]
  },
  activeMultiplier: 0.5,
  particleCount: 30000
});
*/
var audioListener = new THREE.AudioListener();
camera.add(audioListener);

var sound = new THREE.Audio(audioListener);
var audioLoader = new THREE.AudioLoader();
audioLoader.load('sound/rain.mp3', function(buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});

// texture containing the depth values from the shadowMap_Camera POV
// TODO: create the depthTexture associating with this RenderTarget
var shadowMap = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
shadowMap.texture.format = THREE.RGBFormat;
shadowMap.texture.minFilter = THREE.NearestFilter;
shadowMap.texture.magFilter = THREE.NearestFilter;
shadowMap.texture.generateMipmaps = false;
shadowMap.stencilBuffer = false;
shadowMap.depthBuffer = true;
shadowMap.depthTexture = new THREE.DepthTexture();
shadowMap.depthTexture.type = THREE.UnsignedShortType;


// load texture
// anisotropy allows the texture to be viewed decently at skewed angles
var colorMap = new THREE.TextureLoader().load('images/color.jpg');
colorMap.minFilter = THREE.LinearFilter;
colorMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
var normalMap = new THREE.TextureLoader().load('images/normal.png');
normalMap.minFilter = THREE.LinearFilter;
normalMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
var aoMap = new THREE.TextureLoader().load('images/ambient_occlusion.png');
aoMap.minFilter = THREE.LinearFilter;
aoMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

// TODO: load texture for environment mapping


// Uniforms
var cameraPositionUniform = {type: "v3", value: camera.position};
var lightColorUniform = {type: "c", value: new THREE.Vector3(1.0, 1.0, 1.0)};
var ambientColorUniform = {type: "c", value: new THREE.Vector3(1.0, 1.0, 1.0)};
var lightDirectionUniform = {type: "v3", value: lightDirection};
var kAmbientUniform = {type: "f", value: 0.1};
var kDiffuseUniform = {type: "f", value: 0.8};
var kSpecularUniform = {type: "f", value: 0.4};
var shininessUniform = {type: "f", value: 50.0};
var armadilloPosition = { type: 'v3', value: new THREE.Vector3(0.0,0.0,0.0)};

var lightViewMatrixUniform = {type: "m4", value: shadowMap_Camera.matrixWorldInverse};
var lightProjectMatrixUniform = {type: "m4", value: shadowMap_Camera.projectionMatrix};

var matrixWorldInverseUniform = {type: "m4", value: camera.matrixWorldInverse};

var lightningUniform = {type: "f", value: 0.0};


// Materials
var depthFloorMaterial = new THREE.ShaderMaterial({
});

var depthArmadilloMaterial = new THREE.ShaderMaterial({
  uniforms: {
    armadilloPosition: armadilloPosition,
  }
});

var terrainMaterial = new THREE.ShaderMaterial({
  uniforms: {
    lightColor: lightColorUniform,
    ambientColor: ambientColorUniform,
    lightDirection: lightDirectionUniform,
    kAmbient: kAmbientUniform,
    kDiffuse: kDiffuseUniform,
    kSpecular: kSpecularUniform,
    shininess: shininessUniform,
    colorMap: { type: "t", value: colorMap },
    normalMap: { type: "t", value: normalMap },
    aoMap: { type: "t", value: aoMap },
    shadowMap: { type: "t", value: shadowMap.depthTexture },
    lightProjectMatrix: lightProjectMatrixUniform,
    lightViewMatrix: lightViewMatrixUniform,
    lightning: lightningUniform,
  }
});

// Skybox texture
// TODO: set up the texture for skybox
var skyboxCubemap = new THREE.CubeTextureLoader()
.setPath( 'images/' )
.load( [
  //Ask the load order
  'negx.png',
  'posx.png',
  'posy.png',
  'negy.png',
  'posz.png',
  'negz.png'
] );
skyboxCubemap.format = THREE.RGBFormat;


// TODO: set up the material for skybox
var skyboxMaterial = new THREE.ShaderMaterial({
  uniforms:{
    skybox: {type: "t", value: skyboxCubemap},
    lightning: lightningUniform,
  },
  side: THREE.DoubleSide
});

var armadilloMaterial = new THREE.ShaderMaterial({
  uniforms: {
    lightColor: lightColorUniform,
    ambientColor: ambientColorUniform,
    lightDirection: lightDirectionUniform,
    kAmbient: kAmbientUniform,
    kDiffuse: kDiffuseUniform,
    kSpecular: kSpecularUniform,
    shininess: shininessUniform,
    armadilloPosition: armadilloPosition,
    lightning: lightningUniform,
  }
});


// TODO: set up the material for environment mapping
var envmapMaterial = new THREE.ShaderMaterial({
  uniforms:{
    skybox: {type: "t", value: skyboxCubemap},
    matrixWorldInverse: matrixWorldInverseUniform,
    lightning: lightningUniform,
  },
  side: THREE.DoubleSide
});

// Load shaders
var shaderFiles = [
  'glsl/depth.vs.glsl',
  'glsl/depth.fs.glsl',

  'glsl/terrain.vs.glsl',
  'glsl/terrain.fs.glsl',

  'glsl/bphong.vs.glsl',
  'glsl/bphong.fs.glsl',

  'glsl/skybox.vs.glsl',
  'glsl/skybox.fs.glsl',

  'glsl/envmap.vs.glsl',
  'glsl/envmap.fs.glsl'
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  depthFloorMaterial.vertexShader = shaders['glsl/depth.vs.glsl'];
  depthFloorMaterial.fragmentShader = shaders['glsl/depth.fs.glsl'];

  depthArmadilloMaterial.vertexShader = shaders['glsl/bphong.vs.glsl'];
  depthArmadilloMaterial.fragmentShader = shaders['glsl/depth.fs.glsl'];

  terrainMaterial.vertexShader = shaders['glsl/terrain.vs.glsl'];
  terrainMaterial.fragmentShader = shaders['glsl/terrain.fs.glsl'];

  armadilloMaterial.vertexShader = shaders['glsl/bphong.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/bphong.fs.glsl'];

  skyboxMaterial.vertexShader = shaders['glsl/skybox.vs.glsl'];
  skyboxMaterial.fragmentShader = shaders['glsl/skybox.fs.glsl'];

  envmapMaterial.vertexShader = shaders['glsl/envmap.vs.glsl'];
  envmapMaterial.fragmentShader = shaders['glsl/envmap.fs.glsl'];
});

// var ctx = renderer.context;
// stops shader warnings, seen in some browsers
// ctx.getShaderInfoLog = function () { return '' };

// Adding objects
// LOAD OBJ ROUTINE
// mode is the scene where the model will be inserted
function loadOBJ(scene, file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if (query.lengthComputable) {
      var percentComplete = query.loaded / query.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };

  var onError = function() {
    console.log('Failed to load ' + file);
  };

  var loader = new THREE.OBJLoader();
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.position.set(xOff, yOff, zOff);
    object.rotation.x = xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale, scale, scale);
    scene.add(object);
  }, onProgress, onError);
}

var terrainGeometry = new THREE.PlaneBufferGeometry(10, 10);

var terrainShadow = new THREE.Mesh(terrainGeometry, depthFloorMaterial);
terrainShadow.rotation.set(-1.57, 0, 0);
depthScene.add(terrainShadow);

var terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
terrain.rotation.set(-1.57, 0, 0);
finalScene.add(terrain);

var skybox = new THREE.Mesh(new THREE.BoxGeometry( 1000, 1000, 1000 ), skyboxMaterial);
finalScene.add(skybox);

loadOBJ(depthScene, 'obj/armadillo.obj', depthArmadilloMaterial, 1.0, -1.0, 1.0, 0, 0, 0, 0);
loadOBJ(finalScene, 'obj/armadillo.obj', armadilloMaterial,      1.0, -1.0, 1.0, 0, 0, 0, 0);
loadOBJ(finalScene, 'obj/armadillo.obj', envmapMaterial,         1.0, 2.0, 1.0, 0, 0, 0, 0);

var sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
var sphere = new THREE.Mesh(sphereGeometry, envmapMaterial);
sphere.position.set(0, 1, -2);
finalScene.add(sphere);

//Now add some Points to make rain.
finalScene.add(particleSystem1);
finalScene.add(particleSystem2);
finalScene.add(particleSystem3);
finalScene.add(particleSystem4);

// Input
var keyboard = new THREEx.KeyboardState();

function checkKeyboard() {
  if (keyboard.pressed("A"))
    armadilloPosition.value.x -= 0.1;
  if (keyboard.pressed("D"))
    armadilloPosition.value.x += 0.1;
  if (keyboard.pressed("W"))
    armadilloPosition.value.z -= 0.1;
  if (keyboard.pressed("S"))
    armadilloPosition.value.z += 0.1;
}

function updateMaterials() {
  cameraPositionUniform.value = camera.position;
  depthFloorMaterial.needsUpdate = true;
  depthArmadilloMaterial.needsUpdate = true;
  terrainMaterial.needsUpdate = true;
  armadilloMaterial.needsUpdate = true;
  skyboxMaterial.needsUpdate = true;
  envmapMaterial.needsUpdate = true;
}

function animateParticles() {
 var verts1 = particleSystem1.geometry.vertices;
   for(var i = 0; i < verts1.length; i++) {
       var vert = verts1[i];
       if (vert.y < 100) {
           vert.y = Math.random() * 100 + 100;
       }
       vert.y = vert.y - (50 * deltaTime);
   }
 var verts2 = particleSystem2.geometry.vertices;
   for(var i = 0; i < verts2.length; i++) {
       var vert = verts2[i];
       if (vert.y < -50) {
           vert.y = Math.random() * 300-200;
       }
       vert.y = vert.y - (50 * deltaTime);
   }
 var verts3 = particleSystem3.geometry.vertices;
   for(var i = 0; i < verts3.length; i++) {
       var vert = verts3[i];
       if (vert.y < -150) {
           vert.y = Math.random() * 200 - 200;
       }
       vert.y = vert.y - (50 * deltaTime);
   }
 var verts4 = particleSystem4.geometry.vertices;
   for(var i = 0; i < verts4.length; i++) {
       var vert = verts4[i];
       if (vert.y < -200) {
           vert.y = Math.random() * -50 - 100;
       }
       vert.y = vert.y - (50 * deltaTime);
   }
   particleSystem1.geometry.verticesNeedUpdate = true;
   particleSystem2.geometry.verticesNeedUpdate = true;
   particleSystem3.geometry.verticesNeedUpdate = true;
   particleSystem4.geometry.verticesNeedUpdate = true;
}

var initialTime = performance.now();

function setLightning(){
  var rightNow = performance.now();
  var elapsedSeconds = Math.trunc(rightNow-initialTime/1000);
  if(elapsedSeconds % 23 == 0){
    lightningUniform.value = 1.0;
  }
  else{
    lightningUniform.value = 0.4;
  }
}

// Update routine
function update() {
  checkKeyboard();
  updateMaterials();

  deltaTime = clock.getDelta();
  animateParticles();

  setLightning();

  requestAnimationFrame(update);
  // render depthScene to shadowMap target (instead of canvas as usual)
  renderer.render(depthScene, shadowMap_Camera, shadowMap);
  // render finalScene to the canvas
  renderer.render(finalScene, camera);

  // UNCOMMENT to see the shadowmap values
  //renderer.render(depthScene, shadowMap_Camera);

  // UNCOMMENT BELOW FOR VR CAMERA
  // ------------------------------
  // Update VR headset position and apply to camera.
   //controls.update();
  // ------------------------------
  // UNCOMMENT ABOVE FOR VR CAMERA
}

resize();
update();
