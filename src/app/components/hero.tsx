'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
// import * as THREE from 'three'
import PixelLoader from './loader'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'

gsap.registerPlugin(SplitText)

// const vertexShader = `
//   varying vec2 vUv;
//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `

// const fragmentShader = `
//   uniform sampler2D uTexture;
//   uniform sampler2D uDataTexture;
//   uniform vec4 resolution;
//   varying vec2 vUv;

//   void main() {
//     vec2 uv = vUv;

//     float containerAspect = resolution.x / resolution.y;
//     float textureAspect = resolution.z;
//     float zoom = resolution.w;

//     float baseScale = min(containerAspect / textureAspect, 1.0);
//     float scale = baseScale * zoom;

//     vec2 scaledUv = (uv - 0.5) / scale + 0.5;

//     vec4 data = texture2D(uDataTexture, vUv);
//     vec2 distortion = data.rg * 0.04;

//     gl_FragColor = texture2D(uTexture, scaledUv - distortion);
//   }
// `

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const heroDescriptionRef = useRef<HTMLDivElement | null>(null);
  const heroBtnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (heroHeadingRef.current) {
      let split = new SplitText(heroHeadingRef.current, { type: "chars, words", linesClass: 'line' });

      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.025,
        ease: "power3.out",
        delay: 1.3,
      });
    }

    if (heroDescriptionRef.current) {
      const splitSub = SplitText.create(heroDescriptionRef.current, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'line',
        autoSplit: true,
      });

      gsap.from(splitSub.lines, {
        yPercent: 120,
        opacity: 0,
        delay: 1.7,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.25,
      });
    }

    if (heroBtnRef.current) {
      gsap.from(heroBtnRef.current, {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.025,
        ease: "power3.out",
        delay: 1.9,
      });
    }
  }, []);

  // useEffect(() => {
  //   // detect screen size
  //   const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024)
  //   checkScreen()
  //   window.addEventListener('resize', checkScreen)
  //   return () => window.removeEventListener('resize', checkScreen)
  // }, [])

  // useEffect(() => {
  //   if (!isLargeScreen) return // only init Three.js on large screens
  //   if (!containerRef.current) return
  //   const container = containerRef.current

  //   let width = container.offsetWidth
  //   let height = container.offsetHeight

  //   const scene = new THREE.Scene()

  //   const camera = new THREE.OrthographicCamera(
  //     width / -2,
  //     width / 2,
  //     height / 2,
  //     height / -2,
  //     -1000,
  //     1000
  //   )
  //   camera.position.z = 1

  //   const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  //   renderer.setSize(width, height)
  //   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  //   container.appendChild(renderer.domElement)

  //   const manager = new THREE.LoadingManager()
  //   manager.onProgress = (_, loaded, total) => {
  //     if (total === 0) return
  //     setProgress(Math.min(100, Math.round((loaded / total) * 100)))
  //   }
  //   manager.onLoad = () => setProgress(100)

  //   const textureLoader = new THREE.TextureLoader(manager)
  //   const mouse = { x: 0, y: 0, vx: 0, vy: 0 }

  //   const onMouseMove = (e: MouseEvent) => {
  //     const rect = container.getBoundingClientRect()
  //     const x = (e.clientX - rect.left) / rect.width
  //     const y = 1 - (e.clientY - rect.top) / rect.height

  //     mouse.vx = x - mouse.x
  //     mouse.vy = y - mouse.y
  //     mouse.x = x
  //     mouse.y = y
  //   }
  //   container.addEventListener('mousemove', onMouseMove)

  //   textureLoader.load('/image (7).jpg', (texture) => {
  //     texture.minFilter = THREE.LinearFilter
  //     texture.magFilter = THREE.LinearFilter

  //     const imageAspect = texture.image.width / texture.image.height
  //     const zoomFactor = 1.1

  //     const gridSize = 32
  //     const data = new Float32Array(4 * gridSize * gridSize)
  //     const dataTexture = new THREE.DataTexture(
  //       data,
  //       gridSize,
  //       gridSize,
  //       THREE.RGBAFormat,
  //       THREE.FloatType
  //     )
  //     dataTexture.needsUpdate = true

  //     const material = new THREE.ShaderMaterial({
  //       uniforms: {
  //         uTexture: { value: texture },
  //         uDataTexture: { value: dataTexture },
  //         resolution: {
  //           value: new THREE.Vector4(width, height, imageAspect, zoomFactor),
  //         },
  //       },
  //       vertexShader,
  //       fragmentShader,
  //       transparent: true,
  //     })

  //     const geometry = new THREE.PlaneGeometry(width, height)
  //     const mesh = new THREE.Mesh(geometry, material)
  //     scene.add(mesh)

  //     const updateDataTexture = () => {
  //       for (let i = 0; i < data.length; i += 4) {
  //         data[i] *= 0.92
  //         data[i + 1] *= 0.92
  //       }

  //       const mx = Math.floor(mouse.x * gridSize)
  //       const my = Math.floor(mouse.y * gridSize)
  //       const radius = 6

  //       for (let y = -radius; y <= radius; y++) {
  //         for (let x = -radius; x <= radius; x++) {
  //           const px = mx + x
  //           const py = my + y
  //           if (px < 0 || py < 0 || px >= gridSize || py >= gridSize) continue

  //           const idx = 4 * (px + py * gridSize)
  //           const power = Math.exp(-(x * x + y * y) / 12)

  //           data[idx] += mouse.vx * power * 6
  //           data[idx + 1] += mouse.vy * power * 6
  //         }
  //       }

  //       mouse.vx *= 0.85
  //       mouse.vy *= 0.85
  //       dataTexture.needsUpdate = true
  //     }

  //     const animate = () => {
  //       updateDataTexture()
  //       renderer.render(scene, camera)
  //       requestAnimationFrame(animate)
  //     }

  //     animate()
  //   })

  //   const onResize = () => {
  //     width = container.offsetWidth
  //     height = container.offsetHeight

  //     renderer.setSize(width, height)

  //     camera.left = -width / 2
  //     camera.right = width / 2
  //     camera.top = height / 2
  //     camera.bottom = -height / 2
  //     camera.updateProjectionMatrix()

  //     const mesh = scene.children[0] as THREE.Mesh
  //     if (mesh) {
  //       mesh.geometry.dispose()
  //       mesh.geometry = new THREE.PlaneGeometry(width, height)

  //       const mat = mesh.material as THREE.ShaderMaterial
  //       const res = mat.uniforms.resolution.value
  //       mat.uniforms.resolution.value.set(width, height, res.z, res.w)
  //     }
  //   }

  //   window.addEventListener('resize', onResize)

  //   return () => {
  //     container.removeEventListener('mousemove', onMouseMove)
  //     window.removeEventListener('resize', onResize)
  //     renderer.dispose()
  //     container.removeChild(renderer.domElement)
  //   }
  // }, [isLargeScreen])

  return (
    <>

      {/* <PixelLoader progress={progress} /> */}

      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* For small & medium screens: fallback image */}
        {!isLargeScreen && (
          <img
            src="/image (7).jpg"
            alt="Hero Image"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

        {/* Hero Content */}
        <div className="absolute bottom-[2rem] left-0 z-20 w-full md:items-center px-[1rem] md:px-12 flex flex-col md:flex-row justify-between gap-8 md:gap-0">
          <h1 ref={heroHeadingRef} className="text-[2.5rem] overflow-hidden sm:text-[3rem] md:text-[4.5rem] text-white leading-[1.2] md:max-w-[50%] ">
            Elevate Your Look <br />
            With Luxurious <br />
            Hair Extensions
          </h1>

          <div className="flex flex-col  gap-4 w-full md:w-[300px]">
            <p className="uppercase text-[.725rem] sm:text-[.825rem] text-white leading-[1.6]" ref={heroDescriptionRef}>
              We sell high-quality virgin human hair wigs designed for natural
              beauty, long-lasting wear, and everyday confidence.
            </p>

            <div
  ref={heroBtnRef}
  className="overflow-hidden inline-block"
>
  <Link
    href="/products"
    className="block bg-pink-500 hover:bg-white hover:text-pink-500 text-white text-center px-6 py-2 sm:px-8 sm:py-3 rounded-full uppercase transition-all duration-300 cursor-pointer"
  >
    Shop Now
  </Link>
</div>


          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
