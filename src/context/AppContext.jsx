import { createContext, useState, useEffect, useRef } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const imageData = [
        { id: 1, name: 'SMVEC SAS', image: '/360/new/artsentrance.webp', thumb: '/360/thumb/artsentrance.jpg', cat: 'campus' },
        { id: 2, name: 'Canteen', image: '/360/new/canteen.webp', thumb: '/360/thumb/canteen.png', cat: 'facility' },
        { id: 3, name: 'Entrance 1', image: '/360/new/entrance1.webp', thumb: '/360/thumb/entrance1.jpg', cat: 'campus' },
        { id: 4, name: 'Entrance 2', image: '/360/new/entrance2.webp', thumb: '/360/thumb/entrance2.jpg', cat: 'campus' },
        { id: 5, name: 'Garden', image: '/360/new/garden.webp', thumb: '/360/thumb/garden.jpg', cat: 'campus' },
        { id: 6, name: 'Gate 1', image: '/360/new/gate1.webp', thumb: '/360/thumb/gate1.jpg', cat: 'campus', position: [11.914959, 79.634273] },
        { id: 7, name: 'Gate 2', image: '/360/new/gate2.webp', thumb: '/360/thumb/gate2.jpg', cat: 'campus', position: [11.914320, 79.634506] },
        { id: 8, name: 'tennis court', image: '/360/new/tennis.webp', thumb: '/360/thumb/tennis.png', cat: 'facility' },
        { id: 9, name: 'volley ball', image: '/360/new/volleyball.webp', thumb: '/360/thumb/volleyball.png', cat: 'facility', position: [11.914043, 79.634704] },
        { id: 10, name: 'Garden 2', image: '/360/new/garden1.webp', thumb: '/360/thumb/garden1.jpg', cat: 'campus' },
        { id: 11, name: 'Computer science lab', image: '/360/lab/lab1.webp', thumb: '/360/thumb/lab1.webp', cat: 'lab' },
        { id: 12, name: 'Physics lab', image: '/360/lab/lab2.webp', thumb: '/360/thumb/lab2.webp', cat: 'lab' },
        { id: 13, name: 'Biotech lab', image: '/360/lab/lab3.webp', thumb: '/360/thumb/lab3.webp', cat: 'lab' },
        { id: 14, name: 'Chemistry lab', image: '/360/lab/lab4.webp', thumb: '/360/thumb/lab4.webp', cat: 'lab' },
        { id: 15, name: 'Computer graphics lab', image: '/360/lab/lab5.webp', thumb: '/360/thumb/lab5.webp', cat: 'lab' },
        { id: 16, name: 'Computer science lab', image: '/360/lab/lab6.webp', thumb: '/360/thumb/lab6.webp', cat: 'lab' },
    ];
    const [currentImage, setCurrentImage] = useState(null); // Initialize as null
    const [filteredImage, setFliteredImage] = useState([]);
    const [isLoadingImage, setIsLoadingImage] = useState(false); // New state for image loading
    const [isMobile, setIsMobile] = useState(false);
    const [inVRMode, setInVRMode] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false)
    const sceneRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);


    useEffect(() => {
        // --- Mobile Detection ---
        const checkIfMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            setIsMobile(/android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent));
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        // --- A-Frame Event Listeners ---
        const sceneAFrameEl = sceneRef.current ? sceneRef.current.el : null;

        if (sceneAFrameEl) {

            const handleEnterVR = () => {
                setInVRMode(true);
            };

            const handleExitVR = () => {
                setInVRMode(false);
            };

            sceneAFrameEl.addEventListener('enter-vr', handleEnterVR);
            sceneAFrameEl.addEventListener('exit-vr', handleExitVR);

            return () => {
                window.removeEventListener('resize', checkIfMobile);
                if (sceneAFrameEl) {
                    sceneAFrameEl.removeEventListener('enter-vr', handleEnterVR);
                    sceneAFrameEl.removeEventListener('exit-vr', handleExitVR);
                }
            };
        } else {
        }

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);
    console.log('isloading', isLoadingImage)
    const handleSelectImage = async (e) => {
        if (isMobile) {
            setIsLoadingImage(true);
            try {
                await preloadImage(e.image); // Preload the new image
                setCurrentImage(e); // Set new image after preloading
                
            } catch (error) {
                console.error("Failed to load image:", error);
                // Handle error (e.g., show a fallback image or message)
            } finally {
                setTimeout(() => {
                    setIsLoadingImage(false); // Hide loader regardless of success or failure

                }, 1000);
            }
            return
        }
        if (e.id === currentImage?.id) return; // Avoid re-loading the same image

        setIsLoadingImage(true); // Show loader
        try {
            await preloadImage(e.image); // Preload the new image
            setCurrentImage(e); // Set new image after preloading
            
        } catch (error) {
            console.error("Failed to load image:", error);
            // Handle error (e.g., show a fallback image or message)
        } finally {
            setIsLoadingImage(false); // Hide loader regardless of success or failure
        }
    };

    const preloadImage = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve();
            img.onerror = (err) => reject(err);
        });
    };
    // useEffect(() => {
    //     // Set initial image when component mounts
    //     if (imageData.length > 0 && !currentImage) {
    //         setCurrentImage(imageData[0]);
    //     }
    // }, [imageData, currentImage]);

    useEffect(() => {
        const data = imageData[0]
        const handleRenderImage = async (e) => {
            if (isMobile) {
                setIsLoadingImage(true);
                try {
                    await preloadImage(e.image);
                    setCurrentImage(e);

                } catch (error) {
                    console.error("Failed to load image:", error);
                    // Handle error (e.g., show a fallback image or message)
                } finally {
                    setTimeout(() => {
                        setIsLoadingImage(false); // Hide loader regardless of success or failure

                    }, 1000);
                }
                return
            }
            if (e.id === currentImage?.id) return; // Avoid re-loading the same image

            setIsLoadingImage(true); // Show loader
            try {
                await preloadImage(e.image); // Preload the new image
                setCurrentImage(e); // Set new image after preloading

            } catch (error) {
                console.error("Failed to load image:", error);
                // Handle error (e.g., show a fallback image or message)
            } finally {
                setIsLoadingImage(false); // Hide loader regardless of success or failure
            }
        };
        handleRenderImage(data)
    }, [])

    function handelRightClick(e) {
        console.log(currentImage.id, imageData.length)
        if (currentImage?.id < imageData?.length) {
            const filtering = imageData.filter(obj => obj.id === currentImage.id + 1);
            setCurrentImage(filtering[0])
        } else {
            return
        }
    }
    function handelLeftClick(e) {
        console.log(currentImage.id, imageData.length)
        if (currentImage?.id > 1) {
            const filtering = imageData.filter(obj => obj.id === currentImage.id - 1);
            setCurrentImage(filtering[0])
        } else {
            return
        }
    }
    return (
        <AppContext.Provider value={{ handelLeftClick,handelRightClick, imageData, isLoadingImage, setIsLoadingImage, filteredImage, setFliteredImage, currentImage, setCurrentImage, handleSelectImage, isMobile, setIsMobile, sceneRef, showSearchBox, setShowSearchBox, isVisible, setIsVisible }}>
            {children}
        </AppContext.Provider>
    )

};