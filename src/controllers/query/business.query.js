import Business from "../../models/Business.js";
import Form from "../../models/Form.js";
import Resident from "../../models/Resident.js";


export const getAllBusinesses = async (req, res) => {
  const { name, status, residentID } = req.query;
  const query = {
    isDeleted: false
  };

  if (name) query.businessName = { $regex: name, $options: 'i' };

  if (status) {
    if (status === 'expired') query.isExpired = true;
    else if (status === 'active') {
      query.isExpired = false;
      query.isClosed = false;
    } else if (status === 'closed') query.isClosed = true;
  }

  if (residentID) query.residentID = residentID;

  try {
    const businesses = await Business.find(query).populate('residentID', 'name');

    // add createdAt from ObjectId
    const businessesWithCreatedAt = businesses.map(b => ({
      ...b.toObject(),
      createdAt: b._id.getTimestamp()
    }));

    return res.status(200).json({
      message: 'Businesses fetched successfully',
      data: businessesWithCreatedAt,
    });
  } catch (error) {
    console.log({
      error: error.message,
      message: "Failed to get businesses",
      function: "getAllBusinesses"
    });
    return res.status(409).json({
      error: error.message,
      message: "Failed to get businesses"
    });
  }
};
export const printBusinesses = async (req, res) => {
  const { status, startDate, endDate, sortBy, sortOrder } = req.query;

  const query = {
    isDeleted: false
  };

  // status filter
  if (status) {
    if (status === "expired") query.isExpired = true;
    else if (status === "active") {
      query.isExpired = false;
      query.isClosed = false;
    } else if (status === "closed") query.isClosed = true;
  }

  try {
    let businesses = await Business.find(query).populate("residentID", "name");

    // Add timestamps: createdAt from ObjectId, updatedAt from schema (priority)
    businesses = businesses.map(b => {
      const obj = b.toObject();

      // Build clean return object
      return {
        ...obj,
        resident: b.residentID?.name || null, // ✅ keep resident name only
        createdAt: b._id.getTimestamp(),
        updatedAt: obj.updatedAt || b._id.getTimestamp()
      };
    });

    // Date range filter → use updatedAt as priority
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : new Date("1970-01-01");
      const end = endDate ? new Date(endDate) : new Date();
      businesses = businesses.filter(b =>
        new Date(b.updatedAt) >= start && new Date(b.updatedAt) <= end
      );
    }

    // Sorting
    let sortedBusinesses = businesses;
    if (sortBy) {
      sortedBusinesses = businesses.sort((a, b) => {
        if (sortOrder === "desc") {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        }
      });
    } else {
      // ✅ Default: sort by updatedAt ascending (earliest → newest)
      sortedBusinesses = businesses.sort((a, b) => a.updatedAt - b.updatedAt);
    }

    return res.status(200).json({
      message: "Businesses fetched successfully",
      data: sortedBusinesses,
    });
  } catch (error) {
    console.log({
      error: error.message,
      message: "Failed to get businesses",
      function: "printBusinesses"
    });
    return res.status(409).json({
      error: error.message,
      message: "Failed to get businesses"
    });
  }
};



export const getBusinessNumbers = async (req, res) => {
    try {
        const totalBusinesses = await Business.countDocuments({ isDeleted: false });
        const activeBusinesses = await Business.countDocuments({ isExpired: false, isClosed: false, isDeleted: false });
        const expiredBusinesses = await Business.countDocuments({ isExpired: true, isDeleted: false });
        const closedBusinesses = await Business.countDocuments({ isClosed: true, isDeleted: false });

        console.log({
            totalBusinesses,
            activeBusinesses,
            expiredBusinesses,
            closedBusinesses,
        })

        return res.status(200).json({
            message: 'Business numbers fetched successfully',
            data: {
                totalBusinesses,
                activeBusinesses,
                expiredBusinesses,
                closedBusinesses,
            },
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get business numbers",
            function: "getBusinessNumbers"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to get business numbers"
        });
    }
}

export const getBusiness = async (req, res) => {
    const { id } = req.params;
    try {
        const business = await Business.findById(id).populate('residentID', 'name isBlocked address dateOfBirth placeOfBirth').populate('formIDs');
        if (business) {
            return res.status(200).json({
                data: business,
            });
        } else {
            return res.status(404).json({
                error: 'Business not found',
                message: "No business found with the provided ID"
            });
        }
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get business",
            function: "getBusiness"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to get business"
        });
    }
}