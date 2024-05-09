import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { FaDownload } from "react-icons/fa";

/**
 * An array of tabs representing different sections of product details.
 */
const tabs = [
  {
    id: "Fiche Technique",
    label: "Fiche Technique",
  },
  {
    id: "Description",
    label: "Description",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic excepturi quibusdam odio deleniti reprehenderit facilis.",
  },
  {
    id: "Video",
    label: "Video",
    content: (
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/"
        title="YouTube Video"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    ),
  },
  // Additional tabs can be added here
];

/**
 * Component representing the details of a product.
 * @param {Object} props - Component properties.
 * @param {boolean} props.isAdmin - Indicates whether the user is an admin.
 */
const ProductDetails = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isEditing, setIsEditing] = useState(false); // Editing state

  /**
   * Handler for tab click event.
   * @param {string} tabId - The ID of the clicked tab.
   */
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  /**
   * Handler for saving product information.
   * @param {Object} newProductInfo - The updated product information.
   */
  const handleSaveProductInfo = (newProductInfo) => {
    setProductInfo(newProductInfo);
    setIsEditing(false); // Finish editing after saving
  };

  /**
   * Handler for deleting a product.
   */
  const handleDeleteProduct = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed) {
      console.log("Product deleted");
      navigate('/admin/product');
    }
  };

  /**
   * Effect hook to update product information and previous location.
   */
  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo.ficheTech]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full "
              src={productInfo.img}
              alt={productInfo.img}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:px-4 flex flex-col gap-6 justify-center">
            <ProductInfo
              isAdmin={isAdmin}
              productInfo={productInfo}
              onSave={handleSaveProductInfo}
              onDelete={handleDeleteProduct}
              isEditing={isEditing} // Pass editing state to child component
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between space-x-4 pt-4">
            <div className="flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                    } py-2 px-4  focus:outline-none`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              className="flex-shrink-0 inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-500 hover:bg-blue-600 text-white font-bodyFont"
              onClick={() => setIsEditing(!isEditing)} // Toggle editing mode
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          <div className="my-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={activeTab === tab.id ? "" : "hidden"}
              >
                {tab.id === "Fiche Technique" && productInfo.ficheTech ? (
                  <div>
                    <table className="table-auto w-full">
                      <tbody>
                        {productInfo.ficheTech.map((row) => (
                          <tr key={row.label} className="bg-gray-100">
                            <td className="border px-4 py-2">{row.label}</td>
                            <td className="border px-4 py-2">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={row.value}
                                  onChange={(e) => {
                                    const updatedFicheTech = [...productInfo.ficheTech];
                                    const index = updatedFicheTech.findIndex(item => item.value === row.value);
                                    updatedFicheTech[index].value = e.target.value;
                                    setProductInfo(prevState => ({ ...prevState, ficheTech: updatedFicheTech }));
                                  }}
                                />
                              ) : (
                                row.value
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="my-4 flex justify-end">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-500 hover:bg-blue-600 text-white font-bodyFont">
                        <FaDownload className="h-5 w-5 mr-2 text-white" />
                        <a
                          href={productInfo.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white"
                        >
                          Download PDF
                        </a>{" "}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{tab.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;